
public class Main {
    public static void main(String[] args) {
        Product product1 = new Product("Steak", 35);
        Product product2 = new Product("Burger", 20);
        OrderLine orderLine1 = new OrderLine(3, product1);
        OrderLine orderLine2 = new OrderLine(2, product2);
        Order order = new Order();
        order.addOrderLine(orderLine1);
        order.addOrderLine(orderLine2);
        System.out.println("The total amount is: " + order.getTotal());
    }
}