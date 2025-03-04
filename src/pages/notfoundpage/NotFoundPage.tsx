import { Button } from "@/components/button/Button";

const NotFoundPage = () => {

    return (
        <>
            <div className="w-full h-full min-h-screen flex items-center justify-center flex-col">
                <div className="max-w-2xl text-center">
                    <h1 className="text-9xl font-semibold mb-2">404</h1>
                    <p className="text-2xl md:text-4xl mb-8">Page not found: pathname</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button>
                            Zurück
                        </Button>
                        <Button>
                            Zurück zur Startseite
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export { NotFoundPage };