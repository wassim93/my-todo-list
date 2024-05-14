interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onCompleteToggle: (id: number) => void;
}
const Todo = ({ id, text, completed, onDelete, onCompleteToggle }: TodoProps) => {
  return (
    <div className={`todo ${completed ? "done" : "in-progress"}`}>
      <div className="todo-actions">
        <input type="checkbox" checked={completed} onChange={() => onCompleteToggle(id)} />
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>

      <div>{text}</div>
    </div>
  );
};

export default Todo;
