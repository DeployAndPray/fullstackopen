```mermaid
sequenceDiagram

  participant browser
  participant server


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa

    server-->>browser: HTML Document

    browser->>browser: Enter form data

    Note over browser: redraw (part of) DOM


    browser->>server: POST: req: JSON
    
    server-->>browser: Status code 201 - resp payload JSON

```