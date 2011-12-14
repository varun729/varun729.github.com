package com.va.homepage;

import java.util.List;
import java.util.logging.Logger;


public class UI {
	private static Logger logger = Logger.getLogger("com.va.homepage");

	private DataModel model;

	public UI(DataModel model) {
		this.model = model;
	}

	public static void main(String[] args) {
		
	}

	public void start() {
		List<String> classes = model.getClasses();
		logger.info("Classes : " + classes);
		String option = getChoice(classes, null);
		List<IProperty> properties = model.getProperties("aClass");
		
		
	}

	private String getChoice(List<String> items, String message) {
		if (message == null) {
			message = "Select one of the following:";
		}
		items.removeAll(null);
		int choice = 0;
		System.out.println(message);
		for (String item : items) {
			System.out.println("  " + (++choice) + ". " + item);
		}
		
		
		
		return null;
	}
	
}
