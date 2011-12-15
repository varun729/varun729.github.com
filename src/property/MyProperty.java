package property;

public class MyProperty implements IProperty {

	private String id;
	private String name;

	public MyProperty(String id, String name) {
		this.id = id;
		this.name = name;
	}
	
	@Override
	public String getId() {
		return id;
	}

	@Override
	public String getName() {
		return name;
	}
	
	public String toString() {
		return id;
	}

}
