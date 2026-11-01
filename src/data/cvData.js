export const cvData = {
  tr: {
    hero: {
      statusBadge: 'Otonom Sistemler & Agentic AI Geliştiricisi',
      name: 'Hikmet Alanlı',
      title: 'Bilgisayar Mühendisi | ',
      subheading: '',
      bio: 'Selçuk Üniversitesi Bilgisayar Mühendisliği öğrencisiyim. İnnova Bilişim Çözümleri bünyesinde LLM tabanlı Agentic AI, RAG mimarileri, ReAct döngüleri, Model Context Protocol (MCP) ve VLM/YOLO çoklu model entegrasyonu üzerine çalıştım. TEKNOFEST Savaşan İHA (SİHA) ve İKA projelerinde ROS2, ArduPilot SITL ve Gazebo simülasyonları üzerinde Hava Savunma Sistemleri (HSS) kaçınma algoritmaları ve otonom karar mekanizmaları geliştirdim. BTK ve Anayurt Savunma stajlarımla katmanlı mimaride backend RESTful servisleri ve savunma sanayii sistem entegrasyonlarında uçtan uca tecrübe edindim.',
      quickStats: [
        { label: 'Savunma & AI Stajı', value: '3 Dönem' },
        { label: 'TEKNOFEST Projeleri', value: 'SİHA & İKA' },
        { label: 'Mühendislik Not Ortalaması', value: '2.9 / 4.0' },
        { label: 'Çekirdek Odak', value: 'Agentic AI & ROS2' }
      ],
      actions: {
        projects: 'Projeleri İncele',
        experience: 'Deneyimler',
        contact: 'İletişime Geç',
        downloadCv: 'CV İndir (PDF)'
      }
    },
    nav: {
      about: 'Hakkımda',
      experience: 'Deneyim',
      projects: 'Projeler',
      skills: 'Yetenekler',
      education: 'Eğitim & Referans',
      contact: 'İletişim'
    },
    interactiveWidget: {
      title: 'SITL Telemetri Simülatörü',
      subtitle: 'ROS2 / ArduPilot karar destek akışı demosu',
      modes: {
        siha: 'İHA Savaşan SİHA (HSS Kaçınma)',
        ika: 'İKA Kara Aracı (ROS2 Sürüş)',
      },
      status: 'SİSTEM ÇALIŞIYOR',
      liveLogsTitle: 'Canlı Olay & Telemetri Kaydı'
    },
    experience: {
      title: 'Deneyim & Stajlar',
      subtitle: 'Savunma sanayii, yapay zekâ araştırma-geliştirme ve kurumsal backend süreçleri',
      items: [
        {
          id: 'innova',
          company: 'İNNOVA BİLİŞİM ÇÖZÜMLERİ A.Ş.',
          role: 'Bilgisayar Mühendisi Stajyeri',
          location: 'Ankara',
          period: 'Temmuz 2026 – Ağustos 2026',
          type: 'Ar-Ge / Yapay Zekâ',
          highlights: [
            'LLM tabanlı agentic AI uygulamaları üzerinde çalıştım; RAG ile bilgi tabanından bağlam çeken, tool calling ile harici fonksiyonları çağıran ve ReAct döngüsüyle adım adım akıl yürüten otonom ajanlar geliştirdim.',
            'İHA operatörlerine karar desteği sunan LLM tabanlı copilot projesinde YOLO nesne tespiti çıktılarını, VLM ile üretilen anlık sahne yorumunu ve telemetri verisini tek bir ajan akışında birleştiren mimariyi kurdum.',
            'ChromaDB ile embedding tabanlı vektör arama, MCP üzerinden araç entegrasyonu ve PyQt ile masaüstü operatör arayüzü geliştirme çalışmalarında aktif görev aldım.'
          ],
          technologies: ['Agentic AI', 'LLM', 'RAG', 'Tool Calling', 'ReAct', 'MCP', 'ChromaDB', 'VLM', 'YOLO', 'PyQt', 'Python']
        },
        {
          id: 'btk',
          company: 'BİLGİ TEKNOLOJİLERİ VE İLETİŞİM KURUMU (BTK)',
          role: 'Bilgisayar Mühendisi Stajyeri',
          location: 'Ankara',
          period: 'Haziran 2025 – Temmuz 2025',
          type: 'Kurumsal Backend & Mimari',
          highlights: [
            'Katmanlı mimari prensiplerine uygun olarak yapılandırılmış kurumsal projede backend tarafında çalışarak RESTful API uç noktaları geliştirdim.',
            'İlişkisel veritabanı şemasının ve tablolar arası ilişkilerin tasarımında yer aldım; yüksek performanslı CRUD (Create, Read, Update, Delete) operasyonlarını yazdım.',
            'Ekip içinde gereksinim analizi, kodlama ve test aşamalarında görev alarak yazılım yaşam döngüsünü (SDLC) gerçek bir kurumsal proje üzerinde uçtan uca deneyimledim.'
          ],
          technologies: ['RESTful API', 'Katmanlı Mimari', 'Relational DB', 'SQL', 'CRUD', 'SDLC', 'C# / .NET']
        },
        {
          id: 'anayurt',
          company: 'ANAYURT SAVUNMA VE TEKNOLOJİ',
          role: 'Bilgisayar Mühendisi Stajyeri',
          location: 'Ankara',
          period: 'Haziran 2024 – Ağustos 2024',
          type: 'Savunma Sanayii',
          highlights: [
            'Savunma sanayii odaklı kritik projelerde yazılım geliştirme ve sistem entegrasyonu süreçlerinde görev aldım.',
            'Proje ekibiyle birlikte yürütülen geliştirme ve test çalışmalarına doğrudan destek verdim; projede kullanılan yeni araç ve teknolojilere kısa sürede uyum sağlayarak katkı sundum.'
          ],
          technologies: ['Savunma Sanayii', 'Sistem Entegrasyonu', 'Yazılım Testi', 'Python', 'C++']
        }
      ]
    },
    projects: {
      title: 'Öne Çıkan Projeler',
      subtitle: 'Otonom hava/kara araçları, agentic yapay zekâ copilotları ve kurumsal yazılımlar',
      categories: [
        { key: 'all', label: 'Tüm Projeler' },
        { key: 'autonomous', label: 'Otonom & Savunma (İHA / İKA)' },
        { key: 'ai', label: 'Agentic AI & Yapay Zekâ' },
        { key: 'software', label: 'Backend & Full-stack' }
      ],
      items: [
        {
          id: 'siha',
          category: 'autonomous',
          title: 'TEKNOFEST - Savaşan İnsansız Hava Aracı (SİHA)',
          badge: 'Selçuk Üniversitesi SUIAT SİHA Takımı',
          shortDesc: 'Hakemlerce dinamik aktif edilen Hava Savunma Sistemleri (HSS) sanal kısıtlı bölgelerinden otonom kaçınma ve görev entegrasyonu.',
          fullDesc: 'Selçuk Üniversitesi SUIAT SİHA takımında Hava Savunma Sistemleri (HSS) kaçınma modülünü üstlendim. Hakemlerce belirli sürelerle aktif edilen ve sanal kısıtlı bölge olarak tanımlanan HSS sahalarından İHA\'nın otonom olarak kaçınmasını sağlayan dinamik algoritmalar geliştirdim. Kaçınma mantığını görev planlama ve otonom uçuş yazılımıyla bütünleştirerek aracın rakip İHA ile it dalaşı / görev mücadelesi sürerken de aktif kısıtlı bölgelerin dışında kalmasını sağladım. Python ve ROS2 ile geliştirdiğim modülleri ArduPilot SITL ve Gazebo simülasyonlarında test ederek uçuş kontrol yazılımı ile otonom karar mekanizmalarının entegrasyonunu başarıyla gerçekleştirdim.',
          tags: ['Python', 'ROS2', 'ArduPilot SITL', 'Gazebo', 'HSS Kaçınma', 'Otonom Seyrüsefer', 'Path Planning'],
          keyFeatures: [
            'Sanal kısıtlı bölgeleri (HSS) gerçek zamanlı hesaplayarak dinamik rota revizyonu',
            'Rakip İHA angajmanı esnasında görev planlama ve güvenli bölge optimizasyonu',
            'ArduPilot SITL ve Gazebo simülasyonlarında kapsamlı test & doğrulama'
          ],
          github: 'https://github.com/hikmetdev'
        },
        {
          id: 'ika',
          category: 'autonomous',
          title: 'İnsansız Kara Aracı Projesi (İKA)',
          badge: 'ROS2 & Sensör Entegrasyonu',
          shortDesc: 'ROS2 tabanlı otonom seyrüsefer, sensör veri işleme ve görüntü işleme tabanlı nesne algılama modülü.',
          fullDesc: 'Python ve ROS2 ile insansız kara aracının (İKA) otonom hareketini yöneten yazılım bileşenlerinin geliştirilmesinde görev aldım. Araç sensörlerinden (LiDAR/kamera/odometri) gelen telemetri verilerini ROS2 düğümleri (node) üzerinden işleyip karar algoritmalarına aktardım. Görüntü işleme tabanlı algılama modülü üzerinde çalışarak elde edilen tespit sonuçlarını aracın otonom sürüş yazılımına başarıyla entegre ettim.',
          tags: ['Python', 'ROS2', 'YOLO', 'Görüntü İşleme', 'Sensör Füzyonu', 'Otonom Sürüş', 'Robotik'],
          keyFeatures: [
            'ROS2 pub/sub düğüm mimarisiyle sensör veri işleme boru hattı',
            'YOLO tabanlı engel/hedef algılama çıktılarının sürüş kontrolüne aktarımı',
            'Gerçek zamanlı hız ve direksiyon açısı otonom karar modülü'
          ],
          github: 'https://github.com/hikmetdev'
        },
        {
          id: 'digital-twin',
          category: 'ai',
          title: 'Dijital İkiz Yer Kontrol İstasyonu (YKİ)',
          badge: 'LLM Karar Destekli Mimari',
          shortDesc: 'İHA yer kontrol istasyonuna entegre edilen LLM tabanlı yapay zekâ copilotu ve simülasyon ortamı dijital ikizi.',
          fullDesc: 'Python ile geliştirilen İHA Yer Kontrol İstasyonu (YKİ) uygulamasına LLM tabanlı yapay zekâ bileşenleri entegre ettim. Dijital ikiz yaklaşımıyla simülasyon ortamını, uçuş kontrol yazılımını ve yapay zekâ karar bileşenlerini tek platformda birleştiren sistem mimarisinin oluşturulmasında ve bileşenler arası senkronizasyonda aktif rol aldım. Operatöre acil durumlarda akıllı tavsiyeler üreten copilot mekanizması sağladım.',
          tags: ['Python', 'LLM Copilot', 'Dijital İkiz', 'PyQt', 'Telemetri', 'Simülasyon', 'Agentic AI'],
          keyFeatures: [
            'Uçuş telemetrisi ve görev durumunun gerçek zamanlı dijital ikiz modellemesi',
            'LLM destekli operatör karar destek mekanizması ve anomali uyarıları',
            'PyQt ile sezgisel, yüksek performanslı yer kontrol arayüzü'
          ],
          github: 'https://github.com/hikmetdev'
        },
        {
          id: 'call-center',
          category: 'software',
          title: 'Çağrı Merkezi Kurumsal Uygulaması',
          badge: 'Fullstack .NET & SQL',
          shortDesc: 'C# ve .NET ile geliştirilen, RESTful API servisleri ve ilişkisel veritabanı tasarımını içeren kurumsal uygulama.',
          fullDesc: 'C# ve .NET mimarisinde geliştirilen çağrı merkezi uygulamasında hem frontend hem backend tarafında aktif görev aldım. REST API servislerinin sıfırdan geliştirilmesi, kimlik doğrulama, çağrı kuyruk yönetimi ve veri entegrasyonu üzerinde çalıştım. SQL veritabanı şema tasarımında görev alarak arayüzden veri katmanına uzanan uçtan uca geliştirme sürecine katkı sağladım.',
          tags: ['C#', '.NET', 'REST API', 'SQL', 'Veritabanı Tasarımı', 'Full-stack'],
          keyFeatures: [
            'RESTful mimaride optimize edilmiş API uç noktaları',
            'İlişkisel SQL veritabanı normalizasyonu ve verimli sorgulama',
            'Rol tabanlı yetkilendirme ve çağrı kayıt yönetimi'
          ],
          github: 'https://github.com/hikmetdev'
        },
        {
          id: 'accounting',
          category: 'software',
          title: 'Akıllı Muhasebe & Finans Uygulaması',
          badge: 'Masaüstü & Ürün Yönetimi',
          shortDesc: 'İşletmelerin gelir-gider ve fatura süreçlerini dijitalleştiren masaüstü muhasebe yazılımı.',
          fullDesc: 'Lise döneminde C# ve SQL kullanarak muhasebe ve finans kayıtlarını dijital ortamda yöneten tam donanımlı bir masaüstü yazılımı geliştirdim. Uygulamanın gerçek işletme süreçlerine uyarlanmasında, pazarlanmasında ve satışında aktif rol alarak yazılım geliştirmenin yanında ürün yönetimi, müşteri geri bildirimi ve ticari dağıtım deneyimi kazandım.',
          tags: ['C#', 'SQL', 'Ürün Yönetimi', 'Masaüstü Yazılım', 'Finans'],
          keyFeatures: [
            'Kasa, stok, cari hesap ve fatura yönetimi',
            'Gerçek işletmelerde kurulum, adaptasyon ve satış deneyimi',
            'Kullanıcı dostu arayüz ve otomatik raporlama modülleri'
          ],
          github: 'https://github.com/hikmetdev'
        }
      ]
    },
    skills: {
      title: 'Teknik Yetenekler & Uzmanlıklar',
      subtitle: 'Modern yazılım mühendisliği, yapay zekâ mimarileri ve robotik ekosistemler',
      categories: [
        {
          id: 'agentic',
          title: 'Yapay Zekâ & Agentic Sistemler',
          icon: 'Brain',
          description: 'Otonom ajanlar, copilot mimarileri, RAG ve çoklu model entegrasyonu',
          skills: [
            { name: 'LLM & Agentic AI', level: 92, tag: 'ReAct, Tool Calling' },
            { name: 'RAG & Vektör Arama', level: 90, tag: 'ChromaDB' },
            { name: 'MCP (Model Context Protocol)', level: 88, tag: 'Araç Entegrasyonu' },
            { name: 'VLM & YOLO Çoklu Model', level: 85, tag: 'Görsel Sahne Analizi' },
            { name: 'Prompt Engineering & Flow', level: 90, tag: 'Karar Akışları' }
          ]
        },
        {
          id: 'robotics',
          title: 'Otonom Sistemler & Robotik',
          icon: 'Compass',
          description: 'Hava ve kara araçları için simülasyon, seyrüsefer ve otonom karar sistemleri',
          skills: [
            { name: 'ROS / ROS2', level: 88, tag: 'Node, Pub/Sub, Service' },
            { name: 'ArduPilot SITL & Gazebo', level: 86, tag: 'Uçuş & Görev Simülasyonu' },
            { name: 'HSS Kaçınma Algoritmaları', level: 90, tag: 'Sanal Kısıtlı Bölge / Path' },
            { name: 'Görüntü İşleme & YOLO', level: 84, tag: 'Nesne Tespiti / Tracking' },
            { name: 'Sensör Füzyonu & Telemetri', level: 82, tag: 'İHA / İKA Entegrasyonu' }
          ]
        },
        {
          id: 'backend',
          title: 'Yazılım & Backend Mimarisi',
          icon: 'Server',
          description: 'Katmanlı mimariler, kurumsal RESTful API\'ler ve veritabanı yönetimi',
          skills: [
            { name: 'Python', level: 92, tag: 'AI, ROS2, Scripting' },
            { name: 'C# & .NET', level: 88, tag: 'Backend, REST API' },
            { name: 'RESTful API & Katmanlı Mimari', level: 86, tag: 'Enterprise SDLC' },
            { name: 'SQL & İlişkisel Veritabanı', level: 85, tag: 'Şema & CRUD' },
            { name: 'PyQt & Operatör UI', level: 85, tag: 'Masaüstü Arayüzü' }
          ]
        },
        {
          id: 'devops',
          title: 'Araçlar, Yöntemler & Diller',
          icon: 'Cpu',
          description: 'Geliştirme araçları, yaşam döngüsü ve yabancı dil yetkinliği',
          skills: [
            { name: 'Git & GitHub', level: 90, tag: 'Versiyon Kontrol' },
            { name: 'Linux / Ubuntu & Shell', level: 86, tag: 'Geliştirme Ortamı' },
            { name: 'SDLC & Çevik Süreçler', level: 85, tag: 'Yazılım Yaşam Döngüsü' },
            { name: 'Sistem Entegrasyonu', level: 88, tag: 'Donanım / Yazılım Köprüsü' },
            { name: 'İngilizce (B1)', level: 75, tag: 'Teknik Dokümantasyon & İletişim' }
          ]
        }
      ]
    },
    education: {
      title: 'Eğitim & Referanslar',
      subtitle: 'Akademik temel, resmi referans ve yabancı dil yetkinlikleri',
      university: {
        name: 'Selçuk Üniversitesi',
        degree: 'Bilgisayar Mühendisliği Lisans',
        location: 'Konya, Türkiye',
        period: '2023 – 2027',
        gpa: 'GPA: 2.9 / 4.0',
        note: 'SUIAT SİHA ve Otonom Sistemler Takımı Aktif Üyesi'
      },
      reference: {
        title: 'Resmi Referans',
        name: 'Sedat SARIKAYA',
        role: 'Ar-Ge Teşvikleri Yönetimi Eksperi',
        company: 'İnnova Bilişim Çözümleri A.Ş.',
        email: 'ssarikaya@innova.com.tr',
        phone: '+90 537 503 93 23'
      },
      languages: [
        { name: 'Türkçe', level: 'Anadil', badge: 'Ana Dil' },
        { name: 'İngilizce', level: 'B1 Seviyesi', badge: 'Mesleki & Teknik Yetkinlik' }
      ]
    },
    contact: {
      title: 'İletişime Geçin',
      subtitle: 'Savunma sanayii, otonom sistemler veya agentic AI projeleriniz için bana dilediğiniz zaman ulaşabilirsiniz.',
      phone: '+90 531 451 53 30',
      email: 'halanli025@gmail.com',
      location: 'Konya, Türkiye',
      linkedin: 'https://linkedin.com/in/hikmet-alanlı',
      github: 'https://github.com/hikmetdev',
      formTitle: 'Hızlı Mesaj Gönder',
      formNamePlaceholder: 'Adınız Soyadınız',
      formEmailPlaceholder: 'E-posta Adresiniz',
      formSubjectPlaceholder: 'Konu (Örn: İş / Proje Görüşmesi)',
      formMessagePlaceholder: 'Mesajınızı yazınız...',
      formSubmit: 'Mesaj Gönder',
      copySuccess: 'Kopyalandı!'
    },
    footer: {
      rights: '© 2026 Hikmet Alanlı. Tüm hakları saklıdır.',
      tagline: 'Otonom Sistemler, Yapay Zekâ & Modern Yazılım Mimarisi'
    }
  },

  en: {
    hero: {
      statusBadge: 'Autonomous Systems & Agentic AI Engineer',
      name: 'Hikmet Alanlı',
      title: 'Computer Engineer | Agentic AI & Autonomous Systems',
      subheading: 'Defense Tech & Autonomous UAV/UGV Systems & LLM Copilot Architecture',
      bio: 'Computer Engineering student at Selçuk University passionate about Autonomous Systems and Agentic AI. At İnnova Bilişim Çözümleri, engineered LLM-based Agentic AI copilots utilizing RAG architectures, ReAct reasoning loops, Model Context Protocol (MCP), and multimodal VLM/YOLO integration for UAV operator decision support. In TEKNOFEST Combat UAV (SİHA) & UGV projects, developed autonomous Air Defense System (HSS) avoidance algorithms and decision mechanisms on ROS2, ArduPilot SITL, and Gazebo. Experienced in layered RESTful backend services and defense tech system integration at BTK and Anayurt Defence.',
      quickStats: [
        { label: 'Defense & AI Internships', value: '3 Terms' },
        { label: 'TEKNOFEST Projects', value: 'UAV & UGV' },
        { label: 'Engineering GPA', value: '2.9 / 4.0' },
        { label: 'Core Focus', value: 'Agentic AI & ROS2' }
      ],
      actions: {
        projects: 'Explore Projects',
        experience: 'Experience',
        contact: 'Contact Me',
        downloadCv: 'Download CV (PDF)'
      }
    },
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education & Reference',
      contact: 'Contact'
    },
    interactiveWidget: {
      title: 'SITL Telemetry Simulator',
      subtitle: 'Real-time interactive ROS2 / ArduPilot decision flow demo',
      modes: {
        siha: 'Combat UAV (HSS Avoidance)',
        ika: 'UGV Ground Vehicle (ROS2 Drive)',
      },
      status: 'SYSTEM ONLINE',
      liveLogsTitle: 'Real-time Event & Telemetry Stream'
    },
    experience: {
      title: 'Work Experience & Internships',
      subtitle: 'Defense industry, artificial intelligence R&D, and enterprise backend engineering',
      items: [
        {
          id: 'innova',
          company: 'İNNOVA BİLİŞİM ÇÖZÜMLERİ A.Ş.',
          role: 'Computer Engineering Intern',
          location: 'Ankara, TR',
          period: 'July 2026 – August 2026',
          type: 'R&D / Artificial Intelligence',
          highlights: [
            'Worked on LLM-based agentic AI applications; engineered autonomous agents that retrieve context with RAG, invoke external tools via tool calling, and execute step-by-step reasoning via ReAct cycles.',
            'In an LLM copilot project providing decision support for UAV operators, developed the pipeline integrating YOLO object detections, VLM-generated visual scene interpretations, and live telemetry in a unified agent stream.',
            'Actively participated in embedding-based vector search with ChromaDB, tool integration through MCP (Model Context Protocol), and desktop operator GUI development in PyQt.'
          ],
          technologies: ['Agentic AI', 'LLM', 'RAG', 'Tool Calling', 'ReAct', 'MCP', 'ChromaDB', 'VLM', 'YOLO', 'PyQt', 'Python']
        },
        {
          id: 'btk',
          company: 'INFORMATION & COMMUNICATION TECHNOLOGIES AUTHORITY (BTK)',
          role: 'Computer Engineering Intern',
          location: 'Ankara, TR',
          period: 'June 2025 – July 2025',
          type: 'Enterprise Backend & Architecture',
          highlights: [
            'Engineered RESTful API endpoints on the backend of an enterprise project structured around layered architecture.',
            'Participated in relational database schema and table relation design; implemented robust and performant CRUD (Create, Read, Update, Delete) data operations.',
            'Engaged in requirement analysis, implementation, and testing within the team, gaining end-to-end SDLC experience on an active project.'
          ],
          technologies: ['RESTful API', 'Layered Architecture', 'Relational DB', 'SQL', 'CRUD', 'SDLC', 'C# / .NET']
        },
        {
          id: 'anayurt',
          company: 'ANAYURT DEFENSE AND TECHNOLOGY',
          role: 'Computer Engineering Intern',
          location: 'Ankara, TR',
          period: 'June 2024 – August 2024',
          type: 'Defense Industry',
          highlights: [
            'Participated in software development and system integration pipelines for defense industry-focused projects.',
            'Collaborated closely with the engineering team; rapidly adapted to new tools and methodologies to drive testing and integration.'
          ],
          technologies: ['Defense Industry', 'System Integration', 'Software Testing', 'Python', 'C++']
        }
      ]
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Autonomous aerial & ground robotics, agentic AI copilots, and enterprise software',
      categories: [
        { key: 'all', label: 'All Projects' },
        { key: 'autonomous', label: 'Autonomous & Defense (UAV / UGV)' },
        { key: 'ai', label: 'Agentic AI & Machine Learning' },
        { key: 'software', label: 'Backend & Full-stack' }
      ],
      items: [
        {
          id: 'siha',
          category: 'autonomous',
          title: 'TEKNOFEST - Combat Unmanned Aerial Vehicle (UAV / SİHA)',
          badge: 'Selçuk University SUIAT UAV Team',
          shortDesc: 'Autonomous avoidance of dynamic Air Defense System (HSS) virtual restricted zones and mission integration.',
          fullDesc: 'Led the Air Defense System (HSS) avoidance module in Selçuk University SUIAT Combat UAV team. Engineered dynamic navigation algorithms allowing the UAV to autonomously avoid referee-activated virtual no-fly zones (HSS). Integrated avoidance logic into mission planning and autonomous flight software, ensuring the aircraft stays clear of active threat bubbles even during dogfights with rival UAVs. Tested and validated Python and ROS2 modules in ArduPilot SITL and Gazebo simulations, seamlessly integrating flight control with autonomous decision mechanisms.',
          tags: ['Python', 'ROS2', 'ArduPilot SITL', 'Gazebo', 'HSS Avoidance', 'Autonomous Navigation', 'Path Planning'],
          keyFeatures: [
            'Real-time calculation of virtual restricted zones (HSS) for dynamic waypoint replanning',
            'Safe-zone optimization during competitive aerial dogfights and mission execution',
            'Extensive testing and validation across ArduPilot SITL and Gazebo environments'
          ],
          github: 'https://github.com/hikmetdev'
        },
        {
          id: 'ika',
          category: 'autonomous',
          title: 'Unmanned Ground Vehicle (UGV / İKA)',
          badge: 'ROS2 & Sensor Fusion',
          shortDesc: 'ROS2-based autonomous drive, sensor data node processing, and computer vision-based obstacle perception.',
          fullDesc: 'Engineered software components managing autonomous navigation of an unmanned ground vehicle using Python and ROS2. Processed telemetry from vehicle sensors (LiDAR/cameras/odometry) across ROS2 nodes to feed navigation decision algorithms. Developed computer vision-based detection modules and integrated detection outputs into autonomous driving software.',
          tags: ['Python', 'ROS2', 'YOLO', 'Computer Vision', 'Sensor Fusion', 'Autonomous Driving', 'Robotics'],
          keyFeatures: [
            'High-throughput ROS2 pub/sub node architecture for sensor telemetry processing',
            'Real-time YOLO perception pipeline driving avoidance and steering decisions',
            'Integrated drive actuators and steering control modules'
          ],
          github: 'https://github.com/hikmetdev'
        },
        {
          id: 'digital-twin',
          category: 'ai',
          title: 'Digital Twin Ground Control Station (GCS / YKİ)',
          badge: 'LLM Decision Support Architecture',
          shortDesc: 'UAV ground control station integrated with LLM-based AI copilot and simulation digital twin.',
          fullDesc: 'Integrated LLM-based artificial intelligence copilot modules into a Python UAV Ground Control Station (GCS). Played a key role in architecting a unified system integrating simulation environments, flight control telemetry, and AI decision components via a digital twin paradigm. Created an intelligent operator assistant producing actionable tactical recommendations during anomalies.',
          tags: ['Python', 'LLM Copilot', 'Digital Twin', 'PyQt', 'Telemetry', 'Simulation', 'Agentic AI'],
          keyFeatures: [
            'Real-time digital twin synchronization with flight telemetry and mission parameters',
            'LLM copilot generating emergency checklists and situational insights',
            'High-performance, intuitive desktop ground station interface built in PyQt'
          ],
          github: 'https://github.com/hikmetdev'
        },
        {
          id: 'call-center',
          category: 'software',
          title: 'Enterprise Call Center Application',
          badge: 'Fullstack .NET & SQL',
          shortDesc: 'Enterprise call management system built in C# and .NET with RESTful API endpoints and relational schema.',
          fullDesc: 'Contributed across frontend and backend development of an enterprise call center software built on C# and .NET. Designed REST API endpoints, user authentication, queue orchestration, and data integration. Designed relational SQL database schemas from UI to data persistence.',
          tags: ['C#', '.NET', 'REST API', 'SQL', 'Database Architecture', 'Full-stack'],
          keyFeatures: [
            'Clean RESTful endpoints with layered separation of concerns',
            'Normalized relational database design and performant queries',
            'Role-based access control and detailed call audit logs'
          ],
          github: 'https://github.com/hikmetdev'
        },
        {
          id: 'accounting',
          category: 'software',
          title: 'Smart Accounting & Finance Software',
          badge: 'Desktop & Product Management',
          shortDesc: 'Desktop financial accounting software digitizing enterprise invoicing and ledger bookkeeping.',
          fullDesc: 'Developed a comprehensive desktop financial application using C# and SQL during high school to digitize business accounting records. Played an active role in custom adaptation to real client workflows, marketing, and sales—gaining valuable product management, customer feedback, and commercial rollout experience alongside engineering.',
          tags: ['C#', 'SQL', 'Product Management', 'Desktop Software', 'Finance'],
          keyFeatures: [
            'Cashflow, stock tracking, customer accounts, and invoice management',
            'Commercial deployment, client training, and adaptation to real business workflows',
            'Intuitive GUI with automated financial reporting'
          ],
          github: 'https://github.com/hikmetdev'
        }
      ]
    },
    skills: {
      title: 'Skills & Engineering Stack',
      subtitle: 'Modern software engineering, artificial intelligence architectures, and robotics ecosystems',
      categories: [
        {
          id: 'agentic',
          title: 'Artificial Intelligence & Agentic AI',
          icon: 'Brain',
          description: 'Autonomous agents, copilot architectures, RAG, and multimodal integration',
          skills: [
            { name: 'LLM & Agentic AI', level: 92, tag: 'ReAct, Tool Calling' },
            { name: 'RAG & Vector Search', level: 90, tag: 'ChromaDB' },
            { name: 'MCP (Model Context Protocol)', level: 88, tag: 'Tool Integration' },
            { name: 'VLM & YOLO Multimodal', level: 85, tag: 'Visual Scene Analysis' },
            { name: 'Prompt Engineering & Flow', level: 90, tag: 'Decision Graph' }
          ]
        },
        {
          id: 'robotics',
          title: 'Autonomous Systems & Robotics',
          icon: 'Compass',
          description: 'Aerial & ground robotics simulation, navigation, and decision mechanisms',
          skills: [
            { name: 'ROS / ROS2', level: 88, tag: 'Node, Pub/Sub, Service' },
            { name: 'ArduPilot SITL & Gazebo', level: 86, tag: 'Flight & Mission Sim' },
            { name: 'HSS Avoidance Algorithms', level: 90, tag: 'Virtual Restricted Zones' },
            { name: 'Computer Vision & YOLO', level: 84, tag: 'Detection & Tracking' },
            { name: 'Sensor Fusion & Telemetry', level: 82, tag: 'UAV / UGV Integration' }
          ]
        },
        {
          id: 'backend',
          title: 'Software & Backend Architecture',
          icon: 'Server',
          description: 'Layered architectures, enterprise RESTful APIs, and database engineering',
          skills: [
            { name: 'Python', level: 92, tag: 'AI, ROS2, Scripting' },
            { name: 'C# & .NET', level: 88, tag: 'Backend, REST API' },
            { name: 'RESTful API & Layered Arch', level: 86, tag: 'Enterprise SDLC' },
            { name: 'SQL & Relational DBs', level: 85, tag: 'Schema & CRUD' },
            { name: 'PyQt & Operator UI', level: 85, tag: 'Desktop Interface' }
          ]
        },
        {
          id: 'devops',
          title: 'Tools, Methodology & Languages',
          icon: 'Cpu',
          description: 'Development toolchain, engineering lifecycle, and language proficiency',
          skills: [
            { name: 'Git & GitHub', level: 90, tag: 'Version Control' },
            { name: 'Linux / Ubuntu & Shell', level: 86, tag: 'Dev Environment' },
            { name: 'SDLC & Agile Workflows', level: 85, tag: 'Lifecycle Management' },
            { name: 'System Integration', level: 88, tag: 'Hardware/Software Bridge' },
            { name: 'English (B1)', level: 75, tag: 'Technical Docs & Communication' }
          ]
        }
      ]
    },
    education: {
      title: 'Education & References',
      subtitle: 'Academic background, verified reference, and language proficiencies',
      university: {
        name: 'Selçuk University',
        degree: 'Bachelor of Science in Computer Engineering',
        location: 'Konya, Turkey',
        period: '2023 – 2027',
        gpa: 'GPA: 2.9 / 4.0',
        note: 'Active Member of SUIAT Combat UAV & Autonomous Systems Team'
      },
      reference: {
        title: 'Professional Reference',
        name: 'Sedat SARIKAYA',
        role: 'R&D Incentives Management Expert',
        company: 'İnnova Bilişim Çözümleri A.Ş.',
        email: 'ssarikaya@innova.com.tr',
        phone: '+90 537 503 93 23'
      },
      languages: [
        { name: 'Turkish', level: 'Native', badge: 'Mother Tongue' },
        { name: 'English', level: 'B1 Level', badge: 'Professional Working Proficiency' }
      ]
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Feel free to reach out for defense tech opportunities, autonomous systems, or agentic AI collaboration.',
      phone: '+90 531 451 53 30',
      email: 'halanli025@gmail.com',
      location: 'Konya, Turkey',
      linkedin: 'https://linkedin.com/in/hikmet-alanlı',
      github: 'https://github.com/hikmetdev',
      formTitle: 'Send a Message',
      formNamePlaceholder: 'Your Name',
      formEmailPlaceholder: 'Your Email',
      formSubjectPlaceholder: 'Subject (e.g., Job / Project Inquiry)',
      formMessagePlaceholder: 'Type your message here...',
      formSubmit: 'Send Message',
      copySuccess: 'Copied!'
    },
    footer: {
      rights: '© 2026 Hikmet Alanlı. All rights reserved.',
      tagline: 'Autonomous Systems, Artificial Intelligence & Modern Software Architecture'
    }
  }
};
