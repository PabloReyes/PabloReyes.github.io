# EntreTodos

> [!NOTE]
> This is a legacy project maintained for portfolio purposes, showcasing early full-stack development patterns with the Grails framework.

**EntreTodos** is a participatory democracy and community management platform designed to empower groups to propose, discuss, and vote on collective initiatives. Built with a focus on transparency and collaboration, it provides a structured lifecycle for community-driven projects.

## Overview

The platform allows communities to organize themselves around shared goals. Users can submit structured proposals, engage in discussions, and cast their support (votes) to bring ideas to life. The system tracks the physical and logical state of each proposal, from initial submission to final implementation.

## Key Features

- **Community Management**: Create and manage independent communities with dedicated admins.
- **Proposal Lifecycle**: Track initiatives through various stages: `PENDING`, `APPROVED`, `CONSIDERING`, `WORKING`, and `DONE`.
- **Collaborative Voting**: A simple and transparent voting system to gauge community support for any given proposal.
- **Reputation System (Karma)**: An integrated rewards system that tracks user participation and community contribution.
- **Rich Text Editing**: Built-in WYSIWYG editor for creating detailed and well-formatted community proposals.
- **Real-time Search**: Integrated full-text search for proposals and tags to enable easy discovery of relevant topics.
- **Social Integration**: Custom user profiles with Gravatar support and community discussions powered by Disqus.
- **Responsive Design**: A fluid UI built to work across devices, ensuring accessibility for all community members.

## Tech Stack

- **Framework**: [Grails 2.x](https://grails.org/) (JVM-based full-stack framework)
- **Language**: Groovy / Java
- **Frontend**: Bootstrap 2.x, jQuery, LESS CSS
- **Security**: Spring Security Core
- **Database**: H2 (In-memory/Local), support for Hibernate-compatible RDBMS
- **Search**: Lucene-based search via the Searchable plugin
- **Integrations**: Gravatar API, Disqus
