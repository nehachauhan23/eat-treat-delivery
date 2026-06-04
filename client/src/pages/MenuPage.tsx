import { useEffect, useState } from "react";
import { getMenu } from "../api/menu";
import MenuCard from "../components/MenuCard";
import type { MenuItem } from "../types";
import { useCartStore } from "../store/cartStore";

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const cart = useCartStore((state) => state.items);

  const getQty = (id: string) => cart.find((i) => i.id === id)?.quantity ?? 0;

  const categories = ["All"];

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch;
  });

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await getMenu();

      console.log("data :", data);

      setMenu(data);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="py-8">
          <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
            What are you
            <br />
            craving today?
          </h1>

          <p className="mt-1 text-stone-400 text-sm">
            Fresh, made-to-order. Delivered in 30 min.
          </p>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-1.5 rounded-full text-sm ${"bg-stone-900 text-white"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {filteredMenu.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              qty={getQty(item.id)}
              onAdd={() => addItem(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
