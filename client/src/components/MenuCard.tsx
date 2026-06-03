import type { MenuItem } from "../types";

interface Props {
  item: MenuItem;
  onAdd: () => void;
}

export default function MenuCard({ item, onAdd }: Props) {
  return (
    <div className="w-64 border rounded p-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-32 w-32 object-cover rounded"
      />

      <h2 className="mt-2 font-semibold text-sm">{item.name}</h2>

      <p className="text-xs text-gray-600">{item.description}</p>

      <p className="mt-1 font-medium">${item.price}</p>

      <button
        onClick={onAdd}
        className="mt-2 w-full rounded border px-2 py-1 text-sm"
      >
        Add To Cart
      </button>
    </div>
  );
}
