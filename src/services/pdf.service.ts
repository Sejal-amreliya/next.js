import { Injectable } from '@nestjs/common';
import { jsPDF } from 'jspdf'; // Import jsPDF library
import 'jspdf-autotable'; // Import jspdf-autotable plugin
import { User } from '../entities/user.entity'; // Import User entity

@Injectable()
export class PdfService {
  // Method to generate a PDF from a list of users
  async generatePdf(users: User[]): Promise<Buffer> {
    const doc = new jsPDF(); // Create a new jsPDF document

    // Map user data to table format
    const tableData = users.map(user => [
      user.name,
      user.email,
      user.phoneNumber,
      user.address,
    ]);

    // Ensure that the autoTable method is available (added in jspdf-autotable plugin)
    if ((doc as any).autoTable) {
      // Add a table with headers and data to the PDF document
      (doc as any).autoTable({
        head: [['Name', 'Email', 'Phone Number', 'Address']], // Table headers
        body: tableData, // Table data
      });
    }

    // Return the PDF document as a Buffer
    return Buffer.from(doc.output('arraybuffer'));
  }
}
