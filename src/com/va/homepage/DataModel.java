package com.va.homepage;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import property.IProperty;

import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.ontology.OntProperty;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.ModelMaker;
import com.hp.hpl.jena.util.iterator.ExtendedIterator;

public class DataModel {
	private static Logger logger = Logger.getLogger("com.va.homepage");

	private final String NS = "http://agrawal-varun.com/homepage.owl#";
	private String owlFile;
	private Model model;
	private OntModel ontModel;

	public DataModel(String owlFile) {
		this.owlFile = owlFile;
	}

	public void load() throws HpException {
//		ModelMaker maker = ModelFactory.createFileModelMaker("datamodel");
//		model = maker.createModel("homepage");
		ontModel = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM, null);
		try {
			FileInputStream fis = new FileInputStream(owlFile);
//			ontModel.read(fis, "http://agrawal-varun.com/homepage.owl", "RDF/XML-ABBREV");
			ontModel.read(fis, null, "RDF/XML-ABBREV");
		} catch (FileNotFoundException e) {
			throw new HpException("The owl file cannot be read : " + owlFile);
		}
	}

	public void close() {
//		model.close();
		ontModel.close();
	}

	public List<String> getClasses() {
		ExtendedIterator classes = ontModel.listClasses();
		logger.info("Contact : " + ontModel.getOntClass("http://agrawal-varun.com/homepage.owl#Contact"));
		List<String> classNames = new ArrayList<String>();
		while (classes.hasNext()) {
			String name = ((OntClass)classes.next()).getLocalName();
			if (name != null)
				classNames.add(name);
		}
		return classNames;
	}

	public List<IProperty> getProperties(String className) {
		OntClass klass = ontModel.getOntClass(NS + className);
		ExtendedIterator properties = klass.listDeclaredProperties(false);
		List<IProperty> props = new ArrayList<IProperty>();
		while (properties.hasNext()) {
			OntProperty prop = (OntProperty) properties.next();
			IProperty iprop = DataFactory.getProperty(prop);
			props.add(iprop);
		}
		return props;
	}

}
