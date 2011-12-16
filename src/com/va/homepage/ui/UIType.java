package com.va.homepage.ui;

public interface UIType {
	
	public static UIType STRING = new UIType() {
		
		@Override
		public String getID() {
			return "string";
		}
	};
	
	public static UIType DESCRIPTION = new UIType() {
		
		@Override
		public String getID() {
			return "longstring";
		}
	};

	public static UIType DURATION = new UIType() {

		@Override
		public String getID() {
			return "from-to";
		}
	};
	
	
	
	String getID();

}
