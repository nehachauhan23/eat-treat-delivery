import type { MenuItem } from "../types";

interface Props {
  item: MenuItem;
  onAdd: () => void;
}

export default function MenuCard({
  item,
  onAdd,
}: Props) {
  return (
    <div className="border rounded p-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-40 w-full object-cover"
      />

      <h2>{item.name}</h2>

      <p>{item.description}</p>

      <p>${item.price}</p>

      <button onClick={onAdd}>
        Add To Cart
      </button>
    </div>
  );
}