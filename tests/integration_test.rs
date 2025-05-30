use is_openable_pdf::is_openable_pdf;
use std::fs;

fn load_pdf(path: &str) -> Vec<u8> {
    fs::read(path).expect("Failed to read test PDF")
}

#[test]
fn test_no_password_pdf() {
    assert!(is_openable_pdf(&load_pdf("samples/no_password.pdf")));
}

#[test]
fn test_empty_password_pdf() {
    assert!(is_openable_pdf(&load_pdf(
        "samples/user_password_empty.pdf"
    )));
}

#[test]
fn test_aesv3_encrypted_pdf_with_empty_password() {
    assert!(is_openable_pdf(&load_pdf(
        "samples/user_password_empty_aesv3.pdf"
    )));
}

#[test]
fn test_password_required_pdf() {
    assert!(!is_openable_pdf(&load_pdf("samples/user_password_set.pdf")));
}

#[test]
fn test_non_pdf_file() {
    assert!(!is_openable_pdf(&load_pdf("samples/kazuhira.jpeg")));
}

#[test]
fn test_empty_data() {
    assert!(!is_openable_pdf(&[]));
}

#[test]
fn test_invalid_data() {
    assert!(!is_openable_pdf(b"not a pdf"));
}
