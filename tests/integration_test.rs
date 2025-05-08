use is_openable_pdf::is_openable_pdf;
use std::fs;

fn load_pdf(path: &str) -> Vec<u8> {
    fs::read(path).expect("failed to read test PDF")
}

#[test]
fn test_no_password_pdf() {
    let data = load_pdf("samples/no_password.pdf");
    assert!(is_openable_pdf(&data));
}

#[test]
fn test_empty_password_pdf() {
    let data = load_pdf("samples/user_password_empty.pdf");
    assert!(is_openable_pdf(&data));
}

#[test]
fn test_password_required_pdf() {
    let data = load_pdf("samples/user_password_set.pdf");
    assert!(!is_openable_pdf(&data));
}

#[test]
fn test_file_is_not_pdf() {
    let data = load_pdf("samples/kazuhira.jpeg");
    assert!(!is_openable_pdf(&data));
}
