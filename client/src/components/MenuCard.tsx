import type { MenuItem } from "../types";

interface Props {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  qty: number;
}

export default function MenuCard({ item, onAdd, qty }: Props) {
  return (
    <div
      key={item.id}
      className="bg-white rounded-2xl border border-stone-100 p-4 flex items-center gap-4 hover:border-stone-200 transition-colors"
    >
      <div className="w-16 h-16 bg-stone-50 rounded-xl flex items-center justify-center text-3xl ">
        <img
          src={item.image}
          alt={item.name}
          className="rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 leading-tight">
              {item.name}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5 leading-snug line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <div>
            <span className="text-sm font-semibold text-stone-900">
              ${item.price.toFixed(2)}
            </span>
          </div>
          {qty === 0 ? (
            <button
              onClick={() => onAdd(item)}
              className="flex items-center gap-1 bg-stone-900 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-stone-700 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                {qty} in cart
              </span>
              <button
                onClick={() => onAdd(item)}
                className="w-7 h-7 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
