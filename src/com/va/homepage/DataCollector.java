package com.va.homepage;

import java.util.List;

public class DataCollector {

	public static void main(String[] args) {
		String owlfile = "homepage.owl";
		DataModel data = new DataModel(owlfile);
		
		data.load();
		
		List<String> classes = data.getClasses();
		List<IProperty> properties = data.getProperties("aClass");
		
		UI ui = new UI(data);
		
		ui.start();
		
		
		
		
		data.close();
	}
	
}
