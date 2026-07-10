"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChartLine, ChevronDown, Percent, Users } from "lucide-react";

import styles from "../parteneri.module.css";

const categories = [
  "Modă & accesorii",
  "Îngrijire & sănătate",
  "Casă & grădină",
  "Tehnologie & auto",
  "Gusturi & experiențe",
  "Timp liber & ai tăi",
];

const partnerBenefits = [
  { title: "Un canal de achiziție fără costuri", body: "Nu există taxe de listare, bugete minime sau comisioane de afiliere. Investiția ta este beneficiul în sine, oferit pe o vânzare pe care oricum ți-o doreai." },
  { title: "O audiență calificată, cu intenție reală", body: "Membrii plătitori sunt oameni care plătesc pentru acces la oferte bune — un semnal de intenție mai clar decât orice metrică de campanie. Membrii gratuiți sunt cumpărători care și-au declarat categoriile de interes. În ambele cazuri, ajungi la public calificat, nu la trafic întâmplător." },
  { title: "Control total asupra ofertei", body: "Tu decizi beneficiul: o reducere procentuală, un voucher, transport gratuit, un cadou, acces anticipat — orice se potrivește marjei și calendarului tău. Poți oferi chiar condiții diferite membrilor gratuiți și celor plătitori." },
  { title: "Protecție pentru valoarea brandului", body: "Oferta ta nu ajunge pe agregatoare de cupoane, nu apare în e-mailuri și nu intră în competiție cu propriile tale campanii. Reducerea rămâne un privilegiu pentru membri, nu o etichetă lipită public pe brandul tău." },
  { title: "Rezultate pe care le vezi în propriul analytics", body: "Traficul din club ajunge la tine prin linkuri tagate UTM, așa că urmărești vizitele și conversiile direct în sistemele tale. Simplu și transparent." },
  { title: "Flexibilitate completă", body: "Nu ești obligat să participi la fiecare ciclu de campanie și poți opri colaborarea oricând. Iar relația cu clienții rămâne integral a ta: comanda, plata și livrarea se întâmplă pe site-ul tău, ca de obicei." },
];

const steps = [
  { title: "Ne scrii", body: "Completezi formularul de mai jos, cu câteva detalii despre brandul tău. Durează un minut." },
  { title: "Discutăm 15 minute", body: "Îți arătăm exact cum ar funcționa Kluppi pentru brandul tău și stabilim împreună detaliile." },
  { title: "Creezi beneficiul pentru membri", body: "Tu alegi oferta — similară, poate, cu ce oferi deja în fluxurile de bun venit sau afiliaților — dar dedicată membrilor Kluppi." },
  { title: "Noi o promovăm în club", body: "O prezentăm membrilor din categoria potrivită, în comunicările clubului și în portalul membrilor." },
  { title: "Urmărești rezultatele", body: "Vezi traficul și conversiile în propriul analytics, iar de la noi primești raportări agregate despre campanie." },
];

const partnerFit = [
  { title: "Cauți alternative la licitațiile tot mai scumpe", body: "Meta și Google rămân utile, dar știi că ai nevoie și de canale care nu se scumpesc cu fiecare trimestru." },
  { title: "Îți pasă cum arată brandul tău în piață", body: "Nu vrei să apari pe agregatoare de cupoane, lângă „mega reduceri” și cronometre. Vrei un context care respectă brandul." },
  { title: "Oferi deja beneficii clienților noi", body: "Ai coduri în fluxurile de bun venit, de coș abandonat sau la afiliați. Kluppi este un canal în plus pentru un efort pe care îl faci deja." },
  { title: "Preferi rezultate măsurabile", body: "Vrei să vezi în cifrele tale dacă un canal funcționează, nu doar să ne crezi pe cuvânt." },
];

const faqs = [
  { question: "Cât costă participarea în Kluppi?", answer: "Nimic. Nu există taxe de listare, bugete de promovare obligatorii sau comisioane de afiliere. Contribuția ta este beneficiul oferit membrilor." },
  { question: "Ce fel de ofertă trebuie să ofer?", answer: "Ce se potrivește brandului tău: o reducere procentuală, un voucher cu valoare fixă, transport gratuit, un cadou, acces anticipat la o colecție. Tu decizi mecanismul și condițiile; noi ne asigurăm doar că oferta este una corectă pentru membri." },
  { question: "Cum ajung membrii la oferta mea?", answer: "Prezentăm oferta în comunicările clubului, iar membrii accesează codul din contul lor. De acolo ajung direct pe site-ul tău și cumpără ca de obicei." },
  { question: "Cine se ocupă de comenzi, plăți și livrare?", answer: "Tu, ca până acum. Vânzarea se încheie direct între membru și brandul tău, pe site-ul tău. Kluppi promovează oferta și îți aduce clientul până la ușă." },
  { question: "Cum măsor rezultatele?", answer: "Linkurile din club sunt tagate UTM, deci vezi traficul și conversiile direct în analytics-ul tău. Raportarea noastră este la nivel de campanie — nu transmitem date personale ale membrilor." },
  { question: "Brandul meu este mic sau de nișă. Are sens pentru mine?", answer: "Da. Membrii își aleg categoriile care îi interesează și ne spun constant ce branduri vor în club. Relevanța contează mai mult decât dimensiunea." },
  { question: "Pot renunța dacă nu funcționează?", answer: "Da, oricând. Nu ești obligat să participi la fiecare ciclu de campanie, iar colaborarea poate fi oprită fără costuri." },
];

type SubmitState = "idle" | "loading" | "success" | "error";
type FormValues = { brandName: string; website: string; fullName: string; role: string; email: string; category: string; message: string; phone: string };

const initialFormValues: FormValues = { brandName: "", website: "", fullName: "", role: "", email: "", category: categories[0], message: "", phone: "" };

function ReadingSection({ id, heading, paragraphs, children }: { id: string; heading: string; paragraphs?: string[]; children?: React.ReactNode }) {
  return (
    <section className={`kluppi-section ${styles.readingSection}`} aria-labelledby={id}>
      <div className={styles.readingColumn}>
        <h2 id={id} className={`kluppi-benefits-heading ${styles.sectionHeading}`} data-reveal>{heading}</h2>
        {paragraphs?.map((paragraph, index) => (
          <p key={paragraph} data-reveal style={index === 1 ? ({ "--reveal-delay": "0.08s" } as React.CSSProperties) : undefined}>{paragraph}</p>
        ))}
        {children}
      </div>
    </section>
  );
}

function FormField({ label, name, placeholder, type = "text", value, pending, onChange }: { label: string; name: keyof FormValues; placeholder: string; type?: "email" | "text" | "url"; value: string; pending: boolean; onChange: (name: keyof FormValues, value: string) => void }) {
  return <label className={styles.field}><span>{label}</span><input className="form-input" type={type} name={name} placeholder={placeholder} value={value} onChange={(event) => onChange(name, event.target.value)} required disabled={pending} /></label>;
}

export function PartnersContent() {
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [, remeasureFaq] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => remeasureFaq((value) => value + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const updateField = (name: keyof FormValues, value: string) => setFormValues((current) => ({ ...current, [name]: value }));
  const pending = submitState === "loading";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("loading");
    try {
      const response = await fetch("/api/partner-inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formValues) });
      const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || !data?.ok) throw new Error("Partner inquiry failed");
      setSubmitState("success");
      setFormValues(initialFormValues);
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.hero}><div className="padding-global"><div className={styles.heroInner}>
        <p className="kluppi-hero-eyebrow" data-reveal>Pentru branduri</p>
        <h1 className={`kluppi-hero-h1 ${styles.heroTitle}`} data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>Clienți noi, fără costuri de achiziție</h1>
        <p className={`kluppi-hero-body ${styles.heroBody}`} data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>Kluppi îți aduce brandul în fața unei comunități de membri care chiar vor să cumpere. Tu oferi un beneficiu dedicat membrilor, noi îl promovăm în club. Fără taxe de listare, fără bugete de promovare, fără comisioane de afiliere.</p>
        <div className={styles.heroCta} data-reveal style={{ "--reveal-delay": "0.24s" } as React.CSSProperties}><a href="#formular" className="kluppi-btn">Devino partener</a><p className="kluppi-hero-trust">Fără costuri · Fără obligații · Totul începe cu o discuție de 15 minute</p></div>
      </div></div></header>

      <section className="kluppi-band" aria-label="Beneficiile pentru parteneri"><div className="kluppi-band-inner"><div className="kluppi-band-grid">
        <div className="kluppi-band-cell" data-reveal><Percent className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} /><p className="kluppi-band-title">Zero comisioane</p></div>
        <div className="kluppi-band-cell" data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}><Users className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} /><p className="kluppi-band-title">Audiență calificată</p></div>
        <div className="kluppi-band-cell" data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}><ChartLine className="kluppi-band-icon" aria-hidden="true" strokeWidth={1.5} /><p className="kluppi-band-title">Rezultate măsurabile</p></div>
      </div></div></section>

      <ReadingSection id="iti-suna-cunoscut" heading="Îți sună cunoscut?" paragraphs={["Ca brand, devine tot mai complicat să atragi clienți noi prin canalele clasice.", "Costurile de achiziție cresc de la an la an. Licitațiile din Meta și Google se scumpesc, iar rezultatele sunt tot mai greu de prezis. Comisioanele de afiliere se adună. Iar reducerile publice, aruncate în toate direcțiile, îți erodează marja și îți obișnuiesc clienții să aștepte mereu următoarea promoție.", "Kluppi vine cu o alternativă: un canal de achiziție în care nu plătești pentru vizibilitate, ci oferi un beneficiu real unei comunități care apreciază exact asta."]}>
        <div className={styles.readingCta} data-reveal><a href="#formular" className="kluppi-btn">Devino partener</a><p className="kluppi-hero-trust">Prima discuție durează 15 minute.</p></div>
      </ReadingSection>
      <ReadingSection id="kluppi-pentru-brand" heading="Cum arată Kluppi din perspectiva brandului tău" paragraphs={["Kluppi este un club privat de shopping cu două tipuri de membri: gratuiți și plătitori. La înscriere, fiecare membru își alege maximum două categorii de interes, iar beneficiile îi sunt prezentate în funcție de această alegere.", "Pentru brandul tău, asta înseamnă că oferta nu se pierde într-un catalog nesfârșit: ajunge în fața unei liste de oameni care au cerut exact categoria ta. Iar codul nu circulă liber — este vizibil doar în portalul membrilor, după autentificare.", "Contextul contează la fel de mult ca audiența: în Kluppi, brandul tău nu apare lângă „lichidări totale” și cronometre, ci într-un spațiu curatoriat, construit pe încredere."]} />

      <section className="kluppi-benefits" aria-labelledby="beneficii-partener"><div className="padding-global"><div className="container-large"><div className="section-padding-large"><div className="kluppi-section-content">
        <h2 id="beneficii-partener" className="kluppi-benefits-heading" data-reveal>Ce primești ca partener?</h2><div className={styles.benefitsGrid}>{partnerBenefits.map((benefit, index) => <article key={benefit.title} className={`kluppi-benefit ${styles.benefitCard}`} data-reveal style={index ? ({ "--reveal-delay": `${(index % 3) * 0.08}s` } as React.CSSProperties) : undefined}><div className="kluppi-benefit-text"><h3 className="kluppi-benefit-title">{benefit.title}</h3><p className="kluppi-benefit-desc">{benefit.body}</p></div></article>)}</div>
      </div></div></div></div></section>

      <section className={`kluppi-section ${styles.stepsSection}`} aria-labelledby="cum-functioneaza"><div className={styles.stepsInner}><h2 id="cum-functioneaza" className={`kluppi-benefits-heading ${styles.stepsHeading}`} data-reveal>Cum funcționează?</h2><ol className={styles.stepsList}>{steps.map((step, index) => <li key={step.title} className={styles.step} data-reveal><span className={styles.stepNumber}>{index + 1}</span><p><strong>{step.title}</strong> — {step.body}</p></li>)}</ol><div className={styles.centeredCta} data-reveal><a href="#formular" className="kluppi-btn">Devino partener</a><p className="kluppi-hero-trust">Primul pas: un formular de un minut.</p></div></div></section>

      <section className="kluppi-benefits" aria-labelledby="pentru-brandul-tau"><div className="padding-global"><div className="container-large"><div className="section-padding-large"><div className="kluppi-section-content">
        <h2 id="pentru-brandul-tau" className="kluppi-benefits-heading" data-reveal>Kluppi este pentru brandul tău dacă…</h2><div className={styles.fitGrid}>{partnerFit.map((item, index) => <article key={item.title} className={`kluppi-benefit ${styles.benefitCard}`} data-reveal style={index ? ({ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties) : undefined}><div className="kluppi-benefit-text"><h3 className="kluppi-benefit-title">{item.title}</h3><p className="kluppi-benefit-desc">{item.body}</p></div></article>)}</div>
      </div></div></div></div></section>

      <section className="kluppi-faq kluppi-section" aria-labelledby="intrebari-frecvente"><div className="kluppi-faq-inner"><h2 id="intrebari-frecvente" className="kluppi-faq-heading" data-reveal>FAQ</h2><div className="kluppi-faq-list" data-reveal>{faqs.map((item, index) => { const open = openFaq === index; return <div className={`kluppi-faq-item${open ? " is-open" : ""}`} key={item.question}><button type="button" className="kluppi-faq-question" onClick={() => setOpenFaq(open ? null : index)} aria-expanded={open}>{item.question}<ChevronDown className="kluppi-faq-chevron" aria-hidden="true" strokeWidth={2} /></button><div className="kluppi-faq-answer-wrap" style={{ height: open ? answerRefs.current[index]?.scrollHeight ?? 0 : 0 }}><p ref={(element) => { answerRefs.current[index] = element; }} className="kluppi-faq-answer">{item.answer}</p></div></div>; })}</div></div></section>

      <section id="formular" className={`kluppi-section ${styles.formSection}`} aria-labelledby="formular-heading"><div className={styles.formInner}>
        <h2 id="formular-heading" className={`kluppi-benefits-heading ${styles.formHeading}`} data-reveal>Adu brandul tău în club</h2><p className={styles.formIntro} data-reveal>Completează formularul, iar noi te contactăm pentru o discuție de 15 minute. Fără angajamente — doar ca să vedem împreună dacă ne potrivim.</p>
        <form className={styles.form} onSubmit={handleSubmit} data-reveal>
          <FormField label="Numele brandului" name="brandName" placeholder="Introdu numele brandului" value={formValues.brandName} pending={pending} onChange={updateField} /><FormField label="Website" name="website" placeholder="https://" type="url" value={formValues.website} pending={pending} onChange={updateField} /><FormField label="Numele tău" name="fullName" placeholder="Introdu numele și prenumele" value={formValues.fullName} pending={pending} onChange={updateField} /><FormField label="Rolul tău" name="role" placeholder="ex.: Marketing Manager, Fondator" value={formValues.role} pending={pending} onChange={updateField} /><FormField label="Adresă de e-mail" name="email" placeholder="Introdu adresa de e-mail" type="email" value={formValues.email} pending={pending} onChange={updateField} />
          <label className={styles.field}><span>Categoria principală</span><select className="form-input" name="category" value={formValues.category} onChange={(event) => updateField("category", event.target.value)} disabled={pending}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className={`${styles.field} ${styles.fullWidth}`}><span>Mesajul tău (opțional)</span><textarea className="form-input" name="message" placeholder="Spune-ne pe scurt ce ai în minte" value={formValues.message} onChange={(event) => updateField("message", event.target.value)} disabled={pending} /></label>
          <input className={styles.honeypot} type="text" name="phone" value={formValues.phone} onChange={(event) => updateField("phone", event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className={`${styles.fullWidth} ${styles.formActions}`}><button className="kluppi-btn" type="submit" disabled={pending}>{pending ? "Se trimite…" : "Trimite"}</button><p>Îți răspundem în 1–2 zile lucrătoare.</p><p>Preferi e-mailul? Scrie-ne la <a href="mailto:partners@kluppi.com">partners@kluppi.com</a>.</p></div>
        </form>
        {submitState === "success" && <p className={`${styles.formMessage} ${styles.success}`} role="status">Mulțumim! Am primit mesajul tău — îți răspundem în 1–2 zile lucrătoare.</p>}{submitState === "error" && <p className={`${styles.formMessage} ${styles.error}`} role="alert">Ceva n-a mers. Încearcă din nou sau scrie-ne la partners@kluppi.com.</p>}
      </div></section>
      <p className={styles.tagline} data-reveal>Discounturile nu sunt problema. Distribuția lor este.</p>
    </main>
  );
}
