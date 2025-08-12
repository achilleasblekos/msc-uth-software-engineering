import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Order {
    private Date date;
    private boolean isPrepaid;
    private List<OrderLine> orderLines;

    public Order() {
        orderLines = new ArrayList<>();
    }

    public Order(Date date, boolean isPrepaid) {
        this.date = date;
        this.isPrepaid = isPrepaid;
    }

    public Date getDate() {
        return date;
    }

    public boolean isPrepaid() {
        return isPrepaid;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setPrepaid(boolean prepaid) {
        isPrepaid = prepaid;
    }
    public void dispatch(){

    }
    public void close(){

    }
    public void addOrderLine(OrderLine orderLine){
        orderLines.add(orderLine);
    }
    public double getTotal(){
        double total = 0;
        for(OrderLine orderLine : orderLines){
            total += orderLine.getOrderLinePrice();
        }
        return total;
    }
}
