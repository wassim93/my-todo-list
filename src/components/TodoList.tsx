import { QueryClient, useMutation, useQuery } from "react-query";
import Todo from "./Todo";
import { deleteTodo, fetchTodos, toggleTodoCompletion } from "../services/api";
const queryClient = new QueryClient();

interface TodoType {
  id: number;
  todo: string;
  completed: boolean;
}
const TodoList = () => {
  const { data, isLoading, isError } = useQuery("todos", fetchTodos, { staleTime: 60000 });
  // Mutations
  const UpdateTodoStatus = useMutation({
    mutationFn: toggleTodoCompletion,
    onSuccess: (res) => {
      // Invalidate and refetch
      if (res.status === 200) {
        queryClient.invalidateQueries("todos");
      }
    },
  });

  const DeleteTodo = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (res) => {
      // Invalidate and refetch
      if (res.status === 200) {
        queryClient.invalidateQueries("todos");
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching todos</div>;
  return (
    <div className="todo-list">
      {data?.todos.map((obj: TodoType) => (
        <Todo
          key={obj.id}
          id={obj.id}
          completed={obj.completed}
          text={obj.todo}
          onDelete={(id: number) => DeleteTodo.mutate(id)} // Call handleDeleteTodo
          onCompleteToggle={(id: number) => UpdateTodoStatus.mutate(id)}
        />
      ))}
    </div>
  );
};

TodoList.propTypes = {};

export default TodoList;
