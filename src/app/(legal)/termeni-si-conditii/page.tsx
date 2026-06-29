import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Termeni și condiții — Kluppi",
  robots: { index: false, follow: false }, // pre-launch — don't index yet
};

export default function TermeniSiConditii() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Termeni și condiții</h1>
      <p className={styles.subtitle}>privind înscrierea pe lista de așteptare Kluppi</p>
      <p className={styles.updated}>Data ultimei actualizări: 26 iunie 2026</p>

      <div className={styles.body}>
        <h2>1. Informații generale</h2>
        <p>
          Prezenții Termeni și condiții reglementează înscrierea pe lista de
          așteptare Kluppi disponibilă prin intermediul site-ului kluppi.com.
        </p>
        <p>
          Platforma Kluppi este operată de DRMX KALEIDOSCOPE LUX DIGITAL
          S.R.L., societate înființată și funcționând potrivit legii române, cu
          sediul social în Târgoviște, str. Col. Ion Nicolin, nr. 2A, bl. 61B,
          sc. A, et. 2, ap. 10, județ Dâmbovița, înregistrată la Registrul
          Comerțului sub nr. J2020000816159, având cod unic de înregistrare
          42919124, denumită în continuare „Kluppi".
        </p>

        <h2>2. Scopul listei de așteptare</h2>
        <p>
          Lista de așteptare permite persoanelor interesate să primească
          informații despre lansarea oficială a platformei Kluppi, accesul
          timpuriu, Prețul Fondator, beneficiile de lansare și alte comunicări
          relevante privind accesul inițial la serviciul Kluppi.
        </p>
        <p>Înscrierea pe lista de așteptare este gratuită.</p>

        <h2>3. Înscrierea pe lista de așteptare</h2>
        <p>
          Pentru înscriere, persoana interesată trebuie să completeze formularul
          disponibil pe site-ul Kluppi, să furnizeze informațiile solicitate și
          să accepte prezenții Termeni și condiții.
        </p>
        <p>
          Înscrierea poate necesita confirmarea adresei de e-mail printr-un
          mecanism de tip double opt-in. În acest caz, înscrierea devine activă
          numai după confirmarea adresei de e-mail.
        </p>
        <p>
          Prin înscriere, persoana solicită includerea pe lista de așteptare
          Kluppi și își exprimă acordul să primească e-mailuri privind lansarea
          Kluppi, accesul timpuriu, Prețul Fondator, beneficiile disponibile,
          invitații de acces, noutăți și comunicări similare legate de club.
        </p>

        <h2>4. Natura înscrierii</h2>
        <p>Înscrierea pe lista de așteptare nu reprezintă:</p>
        <p>
          a. crearea unui cont Kluppi;<br />
          b. încheierea unui abonament;<br />
          c. plasarea unei comenzi;<br />
          d. asumarea unei obligații de plată;<br />
          e. rezervarea fermă a unui preț, beneficiu, ofertă sau cod de
          reducere;<br />
          f. garanția lansării serviciului Kluppi la o anumită dată;<br />
          g. garanția acordării unui anumit beneficiu la lansare.
        </p>
        <p>
          Condițiile aplicabile utilizării serviciului Kluppi, conturilor,
          planurilor gratuite sau cu plată, ofertelor, codurilor și
          abonamentelor vor fi comunicate separat la momentul lansării oficiale
          a platformei și serviciului.
        </p>

        <h2>5. Prețul Fondator și beneficiile de lansare</h2>
        <p>
          Kluppi poate oferi, la lansare, un Preț Fondator, acces timpuriu,
          beneficii speciale sau alte avantaje pentru persoanele înscrise pe
          lista de așteptare.
        </p>
        <p>
          Aceste beneficii pot fi supuse unor condiții suplimentare, inclusiv
          privind perioada de disponibilitate, eligibilitatea, ordinea accesului,
          disponibilitatea tehnică, numărul de locuri sau acceptarea termenilor
          aplicabili serviciului Kluppi la momentul lansării.
        </p>
        <p>
          Înscrierea pe lista de așteptare nu obligă Kluppi să mențină nelimitat
          Prețul Fondator sau să acorde un anumit beneficiu fiecărei persoane
          înscrise.
        </p>

        <h2>6. Dezabonarea și retragerea de pe lista de așteptare</h2>
        <p>
          Persoana înscrisă se poate dezabona oricând de la comunicările Kluppi
          prin linkul de dezabonare inclus în e-mailurile primite sau prin
          transmiterea unei solicitări explicite la{" "}
          <a href="mailto:hello@kluppi.com">hello@kluppi.com</a>.
        </p>
        <p>
          Dezabonarea are ca efect retragerea persoanei de pe lista de așteptare
          Kluppi, întrucât Kluppi nu va mai transmite comunicările privind
          lansarea, accesul timpuriu, Prețul Fondator, beneficiile de lansare sau
          alte informații relevante privind accesul inițial la serviciul Kluppi.
        </p>
        <p>
          Ca urmare, persoana dezabonată poate pierde posibilitatea de a primi
          sau utiliza anumite beneficii, inclusiv Prețul Fondator, accesul
          timpuriu, surprizele de lansare sau alte condiții preferențiale, în
          măsura în care acestea sunt disponibile numai persoanelor aflate pe
          lista de așteptare sau sunt comunicate prin e-mail.
        </p>
        <p>
          Dezabonarea nu împiedică persoana să creeze ulterior un cont Kluppi
          sau să utilizeze serviciul Kluppi după lansare, dacă acesta este
          disponibil. În acest caz, se vor aplica termenii, prețurile,
          beneficiile și condițiile disponibile la momentul respectiv, fără
          garanția aplicării unor condiții preferențiale anterioare.
        </p>
        <p>
          După dezabonare, Kluppi nu va mai transmite comunicări de marketing
          privind lista de așteptare, cu excepția mesajelor strict necesare
          pentru confirmarea sau gestionarea solicitării, dacă este cazul.
        </p>

        <h2>7. Utilizarea corectă a formularului</h2>
        <p>
          Persoana care se înscrie trebuie să furnizeze informații reale și să
          utilizeze o adresă de e-mail asupra căreia are drept de folosință.
        </p>
        <p>
          Este interzisă utilizarea formularului pentru înscrieri false,
          automate, abuzive, frauduloase, realizate în numele altor persoane fără
          acordul acestora sau prin metode care pot afecta funcționarea site-ului
          ori integritatea listei de așteptare.
        </p>
        <p>
          Kluppi poate refuza, suspenda sau elimina o înscriere dacă există
          motive rezonabile să considere că aceasta este falsă, abuzivă,
          frauduloasă, automatizată sau contrară prezenților Termeni și condiții.
        </p>

        <h2>8. Protecția datelor cu caracter personal</h2>
        <p>
          Prelucrarea datelor cu caracter personal se realizează conform Politicii
          de confidențialitate Kluppi.
        </p>
        <p>
          Politica de confidențialitate explică datele prelucrate, scopurile
          prelucrării, temeiurile juridice, durata păstrării, destinatarii
          datelor, drepturile persoanelor vizate și modalitatea de contact pentru
          solicitări privind datele personale.
        </p>
        <p>
          Confirmarea citirii Politicii de confidențialitate nu reprezintă
          consimțământ pentru prelucrări care, potrivit legii, se întemeiază pe
          un alt temei juridic.
        </p>

        <h2>9. Proprietate intelectuală și limba site-ului</h2>
        <p>
          Conținutul disponibil pe site-ul kluppi.com, inclusiv denumirea
          Kluppi, textele, elementele grafice, logo-urile, imaginile, materialele
          vizuale, structura paginilor și celelalte elemente de prezentare,
          aparține Kluppi sau este utilizat de Kluppi în baza unor drepturi ori
          permisiuni valabile.
        </p>
        <p>
          Este permisă accesarea și utilizarea site-ului numai în scop personal
          și informativ, respectiv pentru înscrierea pe lista de așteptare.
          Preluarea, copierea, reproducerea, distribuirea, modificarea,
          publicarea sau utilizarea conținutului site-ului în alte scopuri, fără
          acordul prealabil al Kluppi, este interzisă, cu excepțiile permise de
          lege.
        </p>
        <p>
          Informațiile de pe site și prezenții Termeni și condiții sunt redactate
          în limba română. Eventualele traduceri sau versiuni în alte limbi au
          rol informativ, cu excepția cazului în care Kluppi precizează expres
          altfel.
        </p>

        <h2>10. Modificarea Termenilor și condițiilor</h2>
        <p>
          Kluppi poate modifica prezenții Termeni și condiții pentru a reflecta
          schimbări ale listei de așteptare, ale comunicărilor Kluppi, ale
          site-ului, ale cerințelor legale sau ale procesului de lansare.
        </p>
        <p>
          Versiunea actualizată va fi publicată pe site-ul Kluppi și va indica
          data ultimei actualizări.
        </p>
        <p>
          Modificările nu vor afecta drepturile deja dobândite ale persoanelor
          înscrise, în măsura în care acestea există potrivit legii sau
          condițiilor comunicate anterior.
        </p>

        <h2>11. Legea aplicabilă</h2>
        <p>Prezenților Termeni și condiții li se aplică legea română.</p>
        <p>
          Orice neînțelegere va fi soluționată, în primul rând, pe cale
          amiabilă. În cazul în care soluționarea amiabilă nu este posibilă, se
          vor aplica regulile legale privind competența autorităților și
          instanțelor române.
        </p>

        <h2>12. Contact</h2>
        <p>
          Pentru întrebări privind lista de așteptare sau prezenții Termeni și
          condiții, Kluppi poate fi contactată la{" "}
          <a href="mailto:hello@kluppi.com">hello@kluppi.com</a>.
        </p>
      </div>
    </main>
  );
}
