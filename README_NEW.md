```bash
prisma:generate

// 生成一个 service：

nest g service - NestJS CLI生成服务命令
prisma - 服务名称
--flat - 扁平化目录结构
--no-spec - 不生成测试文件

nest g service prisma --flat --no-spec

graphql
nest g resolver todolist --no-spec --flat


# Write your query or mutation here
query Xxx($page: Int! = 1, $pageSize: Int = 10) {
  todolist(page: $page, pageSize: $pageSize) {
    id
    title
  }
}


npm install

npm install @apollo/client

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

<ApolloProvider client={client}>
    <App />
  </ApolloProvider>


import { gql, useQuery } from '@apollo/client';

const getTodoList = gql`
  query Query {
    todolist {
      content
      id
    }
  }
`;

const { loading, error, data } = useQuery<TodoList>(getTodoList);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;


const createTodoItem = gql`
  mutation Mutation($todoItem: CreateTodoItemInput!) {
    createTodoItem(todoItem: $todoItem) {
      id
      content
    }
  }
`;

const [createTodo] = useMutation(createTodoItem, {
    refetchQueries: [getTodoList]
  });

  async function onClick() {
    await createTodo({
      variables: {
        todoItem: {
          content: Math.random().toString().slice(2, 10)
        }
      }
    })
  }








```

总结

实现了 Resutful 和 GraphQL 版的 CRUD。

前端用 React + @apollo/client。

后端用 Nest + GraphQL + Prisma + MySQL。

GraphQL 主要是定义 schema 和 resolver 两部分，
schema 是 Query、Mutation 的结构，
resolver 是它的实现。

可以在 playground 里调用接口，也可以在 react 里用 @appolo/client 调用。

相比 restful 的版本，graphql 只需要一个接口，然后用查询语言来查，需要什么数据取什么数据，更加灵活。业务开发中，
