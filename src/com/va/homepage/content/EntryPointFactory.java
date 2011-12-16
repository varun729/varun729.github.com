package com.va.homepage.content;

import java.util.LinkedHashMap;
import java.util.Map;

import com.va.homepage.ui.UIType;

public class EntryPointFactory {
	
	private static final String DESCRIPTION_LONG = "description-long";

	private static final String DESCRIPTION_SHORT = "description-short";

	private static final String DURATION = "duration";

	private static final String NAME = "name";
	
	private static EntryPointFactory instance = new EntryPointFactory();
	
	public static EntryPointFactory getInstance() {
		return instance;
	}
	
	public EntryPoint getProject() {
		Map<String, UIType> contents = new LinkedHashMap<String, UIType>();
		contents.put(NAME, UIType.STRING);
		contents.put(DURATION, UIType.DURATION);
		contents.put(DESCRIPTION_SHORT, UIType.DESCRIPTION);
		contents.put(DESCRIPTION_LONG, UIType.DESCRIPTION);
		return new ProjectEntryPoint(contents);
	}

}
