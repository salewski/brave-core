extern crate speedreader;

use speedreader::classifier::feature_extractor::FeatureExtractorStreamer;
use std::fs;
use url::Url;

fn main() {
    let url = Url::parse("http://example.com/hello/world/hello?again").unwrap();
    let doc_path = "./examples/html/2CdyGKStt9jwu5u.html";
    //let doc_path = "./examples/html/gp-ex2.html";
    //let doc_path = "./examples/html/simple.html";

    let data = fs::read_to_string(doc_path).expect("err to string");

    let mut feature_extractor = FeatureExtractorStreamer::try_new(&url).unwrap();
    feature_extractor.write(&mut data.as_bytes()).unwrap();
    let result = feature_extractor.end();

    for (k, v) in result.features.iter() {
        println!("{}: {}", k, v);
    }
}
