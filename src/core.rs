use lopdf::Document;
use lopdf::encryption::DecryptionError;

pub fn is_openable_pdf_internal(pdf_data: &[u8]) -> bool {
    let mut doc = match Document::load_mem(pdf_data) {
        Ok(doc) => doc,
        Err(_) => return false,
    };

    if !doc.is_encrypted() {
        return true;
    }

    match doc.decrypt("") {
        Ok(_) => true,
        Err(err) => handle_decryption_error(err),
    }
}

fn handle_decryption_error(err: lopdf::Error) -> bool {
    use lopdf::Error;

    match err {
        // FIXME: Return true for AESv3 encrypted PDFs as lopdf doesn't support it yet,
        // but they might be openable in actual PDF viewers
        Error::Decryption(DecryptionError::InvalidKeyLength) => true,
        _ => false,
    }
}
