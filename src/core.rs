use lopdf::Document;

pub fn is_openable_pdf_internal(pdf_data: &[u8]) -> bool {
    match Document::load_mem(pdf_data) {
        Ok(doc) => !doc.is_encrypted(),
        Err(_) => false,
    }
}
