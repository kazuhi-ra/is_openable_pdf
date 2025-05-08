pub mod core;
pub use core::is_openable_pdf_internal;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn is_openable_pdf(pdf_data: &[u8]) -> bool {
    is_openable_pdf_internal(pdf_data)
}
