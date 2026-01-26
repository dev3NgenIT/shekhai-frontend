import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

export default function CartItem({
  item,
  handleRemoveItem,
  handleUpdateQuantity,
}) {
  return (
    <div className="flex items-center justify-between rounded-sm bg-gray-50 p-3">
      <div className="flex-1">
        <div className="flex w-full items-center justify-between">
          <h4 className="font-medium text-gray-900">{item.name}</h4>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-gray-400 hover:text-black"
            onClick={() => handleRemoveItem(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="-order-1 flex items-center overflow-hidden rounded-full border border-gray-300">
            <button
              type="button"
              className="cursor-pointer p-2 transition-colors hover:bg-gray-100"
              onClick={() => handleUpdateQuantity(item.id, -1)}
            >
              <Minus size={16} />
            </button>
            <span className="w-10 px-4 py-1 text-center">{item.quantity}</span>
            <button
              type="button"
              className="cursor-pointer p-2 transition-colors hover:bg-gray-100"
              onClick={() => handleUpdateQuantity(item.id, 1)}
            >
              <Plus size={16} />
            </button>
          </div>

          <span className="font-bold text-base">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
