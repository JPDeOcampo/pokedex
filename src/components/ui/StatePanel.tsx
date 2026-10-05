import type { ReactNode } from "react";
import { BallIcon } from "./Icons";

interface StatePanelProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const StatePanel = ({ title, description, action }: StatePanelProps) => {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-12 text-center dark:border-white/15 dark:bg-white/3">
      <span className="mb-4 grid size-14 place-items-center rounded-full bg-stone-100 text-slate-400 dark:bg-white/5">
        <BallIcon className="size-7" />
      </span>
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default StatePanel;
