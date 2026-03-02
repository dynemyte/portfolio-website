export default function TodoItem({ todo, onToggle }) {
  return (
    <div onClick={() => onToggle(todo.id)}>
      {todo.completed ? '✓ ' : '○ '}
      {todo.text}
    </div>
  )
}
