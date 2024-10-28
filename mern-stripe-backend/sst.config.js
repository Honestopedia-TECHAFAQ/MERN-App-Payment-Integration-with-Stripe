import { Api, StackContext } from "sst/constructs";
export function MyStack({ stack }) {
  const api = new Api(stack, "api", {
    routes: {
      "POST /create-payment-intent": "src/index.handler", 
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
export default {
  config(_input) {
    return {
      name: "mern-stripe-backend",
      region: "us-east-1", 
    };
  },
  stacks(app) {
    app.stack(MyStack);
  },
};
