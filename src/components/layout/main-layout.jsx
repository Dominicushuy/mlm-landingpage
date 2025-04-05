import React from "react";
import { cn } from "../../lib/utils";

const MainLayout = ({ children, className, ...props }) => {
  return (
    <main className={cn("flex flex-col", className)} {...props}>
      {children}
    </main>
  );
};

const MainSection = ({ children, className, id, ...props }) => {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

export { MainLayout, MainSection };
