public class OrderLine {
    private int quantity;
    private Product product;

    public OrderLine() {
    }

    public OrderLine(int quantity, Product product) {
        this.quantity = quantity;
        this.product = product;
    }
    public int getQuantity() {
        return quantity;
    }
    public Product getProduct() {
        return product;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public void setProduct(Product product) {
        this.product = product;
    }
    public double getOrderLinePrice() {
        return quantity * product.getUnitPrice();
    }
}
