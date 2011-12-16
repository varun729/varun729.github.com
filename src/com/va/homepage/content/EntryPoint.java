package com.va.homepage.content;

import java.util.Map;

import com.va.homepage.ui.UIType;

public interface EntryPoint {
	
	void write();
	
	Map<String, UIType> getContents();

}
