package com.va.homepage;

import java.util.List;

public class UI {

	public static void main(String[] args) {
		String owlfile = "homepage.owl";
		DataModel data = new DataModel(owlfile);
		
		data.load();
		
		List<String> classes = data.getClasses();
		List<IProperty> properties = data.getProperties("aClass");
		
		
		
		
		
		
		
		data.close();
	}
	
}
