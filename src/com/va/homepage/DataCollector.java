package com.va.homepage;


public class DataCollector {

	public static void main(String[] args) {
		String owlfile = "homepage.owl";
		DataModel data = new DataModel(owlfile);
		
		data.load();
		
		UI ui = new UI(data);
		
		ui.start();
		
		
		
		
		data.close();
	}
	
}
