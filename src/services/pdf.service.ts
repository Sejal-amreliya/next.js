import { Injectable } from '@nestjs/common';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { User } from '../entities/user.entity';

@Injectable()
export class PdfService {
  async generatePdf(users: User[]): Promise<Buffer> {
    const doc = new jsPDF();

    const tableData = users.map(user => [
      user.name,
      user.email,
      user.phoneNumber,
      user.address,
    ]);

    // Ensure that the autoTable method is available
    if ((doc as any).autoTable) {
      (doc as any).autoTable({
        head: [['Name', 'Email', 'Phone Number', 'Address']],
        body: tableData,
      });
    }

    return Buffer.from(doc.output('arraybuffer'));
  }
}
