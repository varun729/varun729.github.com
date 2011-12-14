package com.va.homepage;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.logging.Logger;

import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.ModelMaker;

public class DataHomepage {
	
	private static Logger logger = Logger.getLogger("com.va.homepage");
	private File owlFile;
	private Model model;
	private OntModel ontModel;
	

	
	public DataHomepage(String filename) throws HpException {
		owlFile = new File(filename);
		logger.info("owl file exists : " + owlFile.exists());
		
		logger.info("creating ontology model");
		createModel();
		logger.info("ontology model created");
	}

	private void createModel() throws HpException {
		ModelMaker maker = ModelFactory.createFileModelMaker("hp_model");
		model = maker.createModel("homepage");
		ontModel = ModelFactory.createOntologyModel(OntModelSpec.OWL_DL_MEM);
		try {
			FileInputStream fis = new FileInputStream(owlFile);
			model.read(fis, "http://agrawal-varun.com/homepage.owl");
		} catch (FileNotFoundException e) {
			throw new HpException("The owl file cannot be read : " + owlFile.getPath());
		}
	}
	
	public void close() {
		model.close();
	}

	public static void main(String[] args) throws HpException {
		logger.info("begin data collection");
		DataHomepage data = new DataHomepage("homepage.owl");
	}
	
}
