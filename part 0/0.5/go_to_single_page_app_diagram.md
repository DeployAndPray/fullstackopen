```mermaid
sequenceDiagram

  participant browser
  participant server


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa

    server-->>browser: HTML Document
    Note left of server: Also sends supporting files requested by the html page.
```