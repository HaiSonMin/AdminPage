import { Client } from "@elastic/elasticsearch";
const client = new Client({
  node: "https://...", // Elasticsearch endpoint
  auth: {
    apiKey: {
      // API key ID and secret
      id: "foo",
      api_key: "bar",
    },
  },
});
