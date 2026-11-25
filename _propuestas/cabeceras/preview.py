"""Sirve las propuestas sobre una copia temporal de la portada compilada por Jekyll."""
from argparse import ArgumentParser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from tempfile import TemporaryDirectory

PROPOSALS = Path(__file__).resolve().parent
SITE = PROPOSALS.parents[1] / "_site"
NAMES = {"carta": "Carta", "firma": "Firma", "cielo": "Cielo", "actual": "Actual"}


def comparison_nav(selected):
    links = []
    for slug, label in NAMES.items():
        current = ' aria-current="page"' if slug == selected else ""
        links.append(f'<a href="/{slug}/"{current}>{label}</a>')
    return '<nav class="review-nav" aria-label="Comparar cabeceras"><span>Comparar</span>' + " ".join(links) + "</nav>"


def build_preview(directory):
    original = (SITE / "index.html").read_text()
    start = original.index('<header class="introduction">')
    end = original.index("</header>", start) + len("</header>")
    for asset in SITE.iterdir():
        if asset.name != "index.html" and not asset.name.startswith("."):
            (directory / asset.name).symlink_to(asset)
    (directory / "revision.css").symlink_to(PROPOSALS / "revision.css")
    for slug in NAMES:
        header = original[start:end] if slug == "actual" else (PROPOSALS / f"{slug}.html").read_text()
        page = original[:start] + comparison_nav(slug) + header + original[end:]
        page = page.replace("</head>", '<meta name="robots" content="noindex"><link rel="stylesheet" href="/revision.css"></head>')
        folder = directory / slug
        folder.mkdir()
        (folder / "index.html").write_text(page)
    (directory / "index.html").symlink_to(directory / "carta/index.html")


if __name__ == "__main__":
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--bind", required=True)
    parser.add_argument("--port", type=int, default=4010)
    args = parser.parse_args()
    with TemporaryDirectory(prefix="cabeceras-") as temp:
        build_preview(Path(temp))
        handler = partial(SimpleHTTPRequestHandler, directory=temp)
        with ThreadingHTTPServer((args.bind, args.port), handler) as server:
            server.serve_forever()
