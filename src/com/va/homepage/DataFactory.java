package com.va.homepage;

import property.IProperty;
import property.MyProperty;

import com.hp.hpl.jena.ontology.OntProperty;

public class DataFactory {

	public static IProperty getProperty(OntProperty property) {
		String id = property.getURI();
		String name = property.getLocalName();
		MyProperty prop = new MyProperty(id, name);
		return prop;
	}

}
