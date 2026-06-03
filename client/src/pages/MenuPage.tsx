import { useEffect, useState } from "react";

import { getMenu } from "../api/menu";
import MenuCard from "../components/MenuCard";
import type { MenuItem } from "../types";

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await getMenu();
        console.log("data : ", data );
        
      setMenu(data);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Food Delivery</h1>

      {menu.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onAdd={() => {}}
        />
      ))}
    </div>
  );
}