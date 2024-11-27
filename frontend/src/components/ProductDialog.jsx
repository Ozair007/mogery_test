import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const ProductDialog = ({ isDialogOpen, setIsDialogOpen, selectedProduct }) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="hidden" />
            <DialogTitle className="hidden">Product Details</DialogTitle>
            <DialogContent className="w-[90%] max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="mt-5 space-y-1">
                    {Object.entries(selectedProduct.attributes).map(
                        ([key, value]) => (
                            <div key={key} className="flex space-x-2">
                                <span className=" font-semibold">{key}:</span>
                                <span>{value}</span>
                            </div>
                        )
                    )}
                </div>
                <DialogDescription className="hidden"></DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDialog;
