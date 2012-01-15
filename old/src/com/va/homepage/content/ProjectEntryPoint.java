package com.va.homepage.content;

import java.util.Map;

import com.va.homepage.ui.UIType;

public class ProjectEntryPoint implements EntryPoint {
	
	private Map<String, UIType> contentsMap;

	public ProjectEntryPoint(Map<String, UIType> contentsMap) {
		this.contentsMap = contentsMap;
	}

	@Override
	public void write() {
		// TODO Auto-generated method stub

	}

	@Override
	public Map<String, UIType> getContents() {
		return contentsMap;
	}

}
