public class HourlyEmployee extends Employee {
    private int hourlyPayment;
    private int hoursWorked;
    public HourlyEmployee(){
        super();
        this.hourlyPayment = 0;
        this.hoursWorked = 0;
    }
    public HourlyEmployee(String name, String taxCode, int hourlyPayment, int hoursWorked){
        super(name, taxCode);
        this.hourlyPayment = hourlyPayment;
        this.hoursWorked = hoursWorked;
    }
    public int getHourlyPayment() {
        return hourlyPayment;
    }
    public int getHoursWorked() {
        return hoursWorked;
    }
    public void setHourlyPayment(int hourlyPayment) {
        this.hourlyPayment = hourlyPayment;
    }
    public void setHoursWorked(int hoursWorked) {
        this.hoursWorked = hoursWorked;
    }
    @Override
    public int payment(){
        return hourlyPayment * hoursWorked;
    }
    @Override
    public String toString() {
        return super.toString() + " payment " + payment();
    }
}
