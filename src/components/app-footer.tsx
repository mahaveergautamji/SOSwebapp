import { Separator } from "@/components/ui/separator";

export function AppFooter() {
  return (
    <footer className="py-6 md:py-8">
      <div className="container max-w-7xl">
        <Separator className="my-4" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ by a talented team.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-foreground">Frontend Engineers</h4>
              <ul className="text-muted-foreground">
                <li>MD shairaj</li>
                <li>Vivek kumar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Backend Engineers</h4>
              <ul className="text-muted-foreground">
                <li>Aryan singh</li>
                <li>Mahaveer gautam</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
