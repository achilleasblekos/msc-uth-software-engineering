public abstract class Employee {
    protected String name;
    protected String taxCode;
    public Employee(String name, String taxCode) {
        this.name = name;
        this.taxCode = taxCode;
    }
    public Employee() {

    }
    public String getName() {
        return name;
    }
    public String getTaxCode() {
        return taxCode;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }
    public abstract int payment();
    @Override
    public String toString() {
        return name + " has Tax Code " + taxCode;
    }
}

