# Fogis calendar export

## Environment variables

```
  PORT=4001                              # Port to listen for incoming requests on
  URL=http://localhost:[PORT]            # URL to use as reference to itself for showing the link
  APP_KEY=[32 bytes randomized]          # Encryption key, will be randomized for non-production environments
                                         # which means that the links will be temporary until next restarts.
  GRAPHQL_ENDPOINT=http://localhost:4000 # The URL of the Fogis GraphQL instance
```
