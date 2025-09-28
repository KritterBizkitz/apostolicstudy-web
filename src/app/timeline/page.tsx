// app/timeline/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Apostolic Truth Timeline",
  description:
    "From Pentecost to the present: an in-depth, styled history of Apostolic doctrine, practice, and organizations.",
};

type Section = {
  id: string;
  title: string;
  content: { heading: string; text: string }[];
};

const SECTIONS: Section[] = [
  {
    id: "apostolic-era",
    title: "The Apostolic Era (AD 33–100)",
    content: [
      {
  heading: "The Day of Pentecost (AD 33)",
  text:
    "The timeline of Apostolic truth begins on the Day of Pentecost in Jerusalem. Acts chapter 2 records the descent of the Holy Ghost upon the 120 believers gathered in the upper room. Cloven tongues like as of fire rested upon each of them, and they all began to speak with other tongues as the Spirit gave them utterance. This was the fulfillment of Jesus’ promise in Acts 1:8—\"But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me.\" It also fulfilled Joel’s prophecy that in the last days God would pour out His Spirit upon all flesh.\n\nPeter’s sermon explained the phenomenon: this was not drunkenness but prophecy fulfilled. He declared the death, burial, and resurrection of Jesus Christ, climaxing with the call in Acts 2:38: \"Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost.\" Three thousand obeyed that day, and the apostolic church was born."
},

      {
        heading: "The Spread of the Apostolic Message (AD 33–62)",
        text:
          "The book of Acts shows the unstoppable spread of this message. Persecution in Jerusalem scattered believers, but it only carried the gospel into new territories. Philip preached in Samaria, where both men and women received the Word, were baptized in the name of Jesus, and received the Holy Ghost (Acts 8). Peter preached to Cornelius and his household, the first Gentiles, and the Holy Ghost fell on them as it had at Pentecost (Acts 10). Paul, once the church’s chief persecutor, was converted and became its greatest missionary, establishing churches across Asia Minor and Europe. \n\nEverywhere the apostles went, the pattern was the same: repentance, baptism in the name of Jesus, and the infilling of the Holy Ghost with the evidence of speaking in tongues. Acts 19 shows Paul rebaptizing disciples of John at Ephesus in the name of Jesus and laying hands on them until they received the Spirit and spoke with tongues. This demonstrates continuity in the apostolic method of conversion."
      },
      {
        heading: "The New Testament Scriptures (AD 45–90s)",
        text:
          "As the church spread, the apostles wrote letters of instruction, correction, and encouragement. These writings—Paul’s epistles, Peter’s letters, John’s Gospel and epistles, and others—became the foundation of the New Testament. They preserved doctrine and warned against false teachers. Jude urged believers to “earnestly contend for the faith which was once delivered unto the saints” (Jude 3) \n\nBy the AD 90s, John, the last surviving apostle, received the Revelation on the Isle of Patmos. It gave the church both encouragement and warning: encouragement that Christ reigns supreme, and warning against compromise with the world."
      },
      {
        heading: "The Close of the Apostolic Age (AD 100)",
        text:
          "With the death of John, the direct eyewitness testimony of the apostles ceased. Yet the doctrine they preached—the Oneness of God revealed in Christ, repentance, baptism in the name of Jesus, and the infilling of the Holy Ghost—remained the foundation of the church. This period stands as the unshakable benchmark against which all later developments must be measured."
      }
    ]
  },
  {
    id: "rise-of-creeds",
    title: "Post-Apostolic and the Rise of Creeds (2nd–5th Centuries)",
    content: [
      {
        heading: "Loss of the Apostolic Witness",
        text:
          "By the early second century, the church no longer had living apostles to guide it. Their writings remained, but new generations of leaders—often called the “apostolic fathers”—rose to prominence. Men like Ignatius of Antioch, Justin Martyr, Irenaeus, and Tertullian began to defend Christianity in a hostile world, but in doing so they also introduced new terms and categories foreign to the simplicity of Acts. \n\nThe apostles had preached Christ crucified and risen, repentance, baptism in Jesus’ name, and the infilling of the Holy Ghost with tongues. Their emphasis was on the experience of new birth and the reality of God manifest in Christ. The second-century writers, however, leaned increasingly on philosophy and rhetorical defense. They engaged with Greek categories of thought and Roman legal traditions, gradually shifting the emphasis from Spirit-filled experience to intellectual formulations."
      },
      {
        heading: "Seeds of Doctrinal Drift",
        text:
          "Irenaeus, for example, vigorously opposed heresies such as Gnosticism, but even in his writings we see the beginnings of speculative theology. Tertullian introduced the Latin term trinitas (Trinity) in the early third century. He did not mean by it exactly what later church creeds would codify, but the seed was planted: a move away from the biblical proclamation that “God was in Christ, reconciling the world unto himself” (2 Corinthians 5:19). \n\nBaptism also began to be altered. Instead of consistently invoking the name of Jesus as in Acts, references appear to triune formulas being used. This development was gradual, often mixed with lingering apostolic practice in some regions, but by the third century it had become more common to substitute tradition for the biblical pattern."
      },
      {
        heading: "Nicaea and After (AD 325 →)",
        text:
          "By the fourth century, Christianity had shifted dramatically. Constantine’s so-called “conversion” and the Edict of Milan (AD 313) ended persecution and gave the church imperial favor. With the empire now backing it, the church began to take on the structures and priorities of the empire itself. \n\nThe Council of Nicaea in AD 325, convened by Constantine, sought to unify doctrine and settle disputes over the nature of Christ. Instead of simply appealing to Scripture and apostolic teaching, bishops debated and voted on creeds. The resulting Nicene Creed enshrined terms and concepts foreign to the apostolic church, elevating philosophical categories above the biblical witness. The language of a co-eternal, co-equal Trinity became standardized."
      },
      {
        heading: "The Aftermath: Councils and Creeds",
        text:
          "Following Nicaea, additional councils (such as Constantinople in 381 and Chalcedon in 451) further codified Trinitarian and Christological formulas. Each council moved the mainstream church further from its roots. Where Peter had once commanded baptism “in the name of Jesus Christ for the remission of sins,” the dominant church now insisted on creedal recitation and baptism in the titles “Father, Son, and Holy Spirit."
      },
      {
        heading: "Persecution of the Faithful Remnant",
        text:
            "Amid this drift, there were always believers who sought to hold onto the apostolic message, though their voices were often suppressed. Those who insisted on baptism in Jesus’ name or on the oneness of God were marginalized or branded as heretics. Yet the faith once delivered to the saints did not disappear—it survived underground, preserved by individuals and small groups who valued Scripture over tradition."
      },
      {
        heading: "The Turning Point",
        text:
          "By the fifth century, the pattern was clear: the institutional church had embraced creeds, councils, and imperial backing at the cost of biblical fidelity. What began at Pentecost as a Spirit-filled movement of ordinary people had become a state religion defined by bishops, emperors, and philosophical terms. The rise of creeds marked both a consolidation of political power and a departure from the simplicity of the apostolic gospel. \n\nThis section of the timeline is sobering. It reminds us that human tradition can overwhelm biblical truth when the church abandons Spirit-led experience for man-made systems. Yet even in the midst of this, God preserved a witness, ensuring that the apostolic faith would one day be restored."
      },
      
    ]
  },
  {
    id: "medieval",
    title: "The Medieval Church (6th–15th Centuries)",
    content: [
      {
        heading: "The Rise of the Institutional Church",
        text:
          "By the sixth century, Christianity had become the dominant religion of the Roman Empire and, after the fall of Rome in the West, the central unifying institution of medieval Europe. Bishops and popes gained tremendous influence, not only spiritually but politically. The church claimed authority not merely over souls but over kings and nations. What had begun as a Spirit-filled movement of common believers now resembled a vast institution more concerned with earthly power than apostolic doctrine."
      },
      {
        heading: "The Eclipse of Apostolic Practice",
        text:
          "During this time, the original practices of the apostles were buried under layers of ritual and tradition. Baptism in Jesus’ name was virtually erased from public view, replaced by infant baptism performed with the titles of Matthew 28:19 as interpreted by the councils. The outpouring of the Holy Ghost with tongues as the evidence—so vibrant in Acts—was dismissed as fanaticism or ignored altogether. Worship became ceremonial, conducted in Latin, unintelligible to the common people. The Bible itself was locked away from the laity, chained in monasteries, written in languages they could not read."
      },
      {
        heading: "The Dark Ages and Spiritual Decline",
        text:
          "This era is often called the “Dark Ages,” and spiritually it truly was. Without access to Scripture and with church leadership focused on hierarchy and power, the truth of the gospel was obscured. The papacy grew, indulgences were sold, and salvation was portrayed as something to be purchased or earned rather than experienced through new birth. Apostolic Christianity had not disappeared entirely, but it was forced into the shadows."
      },
      {
        heading: "Glimmers of Light: Dissenting Voices",
        text:
          "Yet God always preserved a remnant. Throughout the Middle Ages, scattered groups and individuals rose up to call for a return to Scripture and holiness. \n\nThe Waldensians (12th century): Followers of Peter Waldo emphasized preaching in the vernacular and living by the Bible. They were persecuted but kept Scripture alive in their communities. \n\nThe Lollards (14th century): Followers of John Wycliffe in England translated the Bible into English and proclaimed that Scripture, not the pope, was the highest authority. \n\n The Hussites (15th century): Inspired by Jan Hus in Bohemia, they emphasized biblical preaching and resisted the corruption of the institutional church. Hus was burned at the stake, but his followers carried on his reforming spirit. \n\nThese groups did not restore the full apostolic pattern, but they represent God’s hand at work in preserving seeds of truth that would later blossom. They demonstrated that even in the darkest times, God’s Word was not silenced."
      }
    ]
  },
  {
    id: "reformation",
    title: "Reformation & Holiness Movements (16th–19th Centuries)",
    content: [
      {
        heading: "Sola Scriptura and Beyond",
        text:
          "In 1517, Martin Luther, a German monk, nailed his Ninety-Five Theses to the church door in Wittenberg. His protest against indulgences ignited a firestorm. Luther’s cry was that salvation was not purchased or earned but received by faith in Christ alone. His emphasis on sola scriptura—Scripture alone as the final authority—struck directly at the power of the institutional church. \n\nOther reformers followed: Ulrich Zwingli in Zurich, John Calvin in Geneva, and later John Knox in Scotland. They rejected many abuses of the medieval church, returning to the authority of Scripture. They translated the Bible into the languages of the people, and the printing press spread it far and wide. The Word of God was unleashed after centuries of being locked away. \n\n Yet, while the Reformation recovered vital truths, it did not restore the full apostolic experience. Many reformers continued infant baptism, and none re-established baptism in the name of Jesus or the infilling of the Holy Ghost with tongues. The Reformation cracked the system open, but it was not the full restoration."
      },
      {
        heading: "The Rise of Renewal Movements (17th–18th Centuries)",
        text:
          "As the centuries unfolded, waves of renewal shook the Protestant world. In the 17th century, Puritans and Pietists sought personal holiness and heartfelt devotion beyond cold institutional religion. They valued prayer, Scripture reading, and heartfelt worship. \n\nThe 18th century brought the Wesleyan revival. John and Charles Wesley preached new birth, sanctification, and holy living. Their movement gave birth to Methodism, which emphasized not only salvation by faith but the call to live a holy, transformed life. Their emphasis on experiential Christianity prepared the soil for Pentecost to be rediscovered."
      },
      {
        heading: "The Holiness Movement (19th Century)",
        text:
          "Out of Methodism came the Holiness movement in the 19th century. Preachers like Phoebe Palmer and others emphasized a second work of grace: entire sanctification. Camp meetings spread across America, where men and women sought deeper experiences with God. The Holiness revivals were marked by fervent prayer, testimonies of healing, and passionate preaching. \n\nThe emphasis on sanctification, holiness of lifestyle, and the possibility of a direct encounter with God set the stage for the Pentecostal outpouring. The Holiness movement taught people to expect more than formal religion. They expected God to move."
      },
      {
        heading: "Early Signs Of Pentecost",
        text:
           "In the late 1800s, reports of speaking in tongues, divine healing, and outpourings of the Spirit began to surface in small circles. Believers were hungering for the same power they read about in Acts. Though not yet fully understood as the New Testament pattern of Spirit baptism, these stirrings showed that God was preparing to restore apostolic truth. \n\nBy the dawn of the 20th century, the pieces were in place. The Bible had been returned to the people. Movements emphasizing holiness, healing, and experiential Christianity were widespread. A fresh hunger burned in the hearts of believers across the world. God was about to answer that hunger with a restoration of Pentecostal power."
      }
    ]
  },
  {
    id: "pentecostal-outpouring",
    title: "Pentecostal Outpouring and Apostolic Faith (1901–1916)",
    content: [
      {
        heading: "Topeka (1901)",
        text:
          "The dawn of the 20th century brought a hunger for something more. In Topeka, Kansas, Charles Parham led a small Bible school dedicated to studying the Word and experiencing the fullness of the New Testament church. He asked his students to search the Scriptures for the biblical evidence of receiving the Holy Ghost. Their conclusion was clear: in Acts, believers always spoke in tongues when they received the Spirit. \n\nOn January 1, 1901, as they prayed, Agnes Ozman, one of Parham’s students, was filled with the Holy Ghost and spoke with tongues. Others soon followed. Though small in scale, this marked the beginning of modern Pentecostalism: the rediscovery of Spirit baptism with tongues as the initial evidence."
      },
      {
        heading: "Azusa Street (1906–1909)",
        text:
          "In 1906, revival erupted in Los Angeles under the leadership of William J. Seymour, an African-American holiness preacher. Meeting first in a humble home on Bonnie Brae Street and then in a rundown mission at 312 Azusa Street, the Spirit was poured out in power. People from every race, background, and denomination flocked to the meetings. The blind saw, the lame walked, and most importantly, multitudes received the Holy Ghost with tongues as in Acts 2. \n\nAzusa Street became the fountainhead of the Pentecostal movement. News spread worldwide through testimonies and through Seymour’s Apostolic Faith newspaper. Missionaries carried the message abroad, and visitors took it home to their churches. What had begun in Kansas now exploded across the globe."
      },
      {
        heading: "The Revelation of the Name (1913–1915)",
        text:
          "In 1913, at a camp meeting in Arroyo Seco, California, R. E. McAlister preached a sermon pointing out that in the book of Acts, baptism was always performed in the name of Jesus. Soon after, preachers like Frank Ewart and Glenn Cook began baptizing converts in Jesus’ name, and many Pentecostals were rebaptized according to Acts 2:38. \n\nThis sparked what became known as the “New Issue” or the Oneness movement. As ministers studied Scripture, they realized that the Trinity doctrine was a later development and that the Bible revealed one God manifested in Christ Jesus. The full apostolic message of repentance, Jesus’ name baptism, and the infilling of the Holy Ghost was restored."
      },
      {
        heading: "The Oneness Controversy (1914–1916)",
        text:
          "The revelation of the name of Jesus brought division within Pentecostal circles. Many embraced it with joy, while others resisted, clinging to traditional creeds. At organizational meetings in 1914, debates over the Godhead and baptism grew intense. By 1916, the rift was permanent. Ministers who embraced Oneness and Jesus’ name baptism were excluded from Trinitarian fellowships. \n\nBut far from destroying the movement, this separation solidified the Oneness Pentecostal identity. They saw themselves not as inventing something new but as restoring the faith once delivered to the saints."
      },
      {
        heading: "The Apostolic Faith Proclaimed",
        text:
        "By 1916, the essential elements of Apostolic faith had been rediscovered: \n\nThe necessity of repentance. \n\nBaptism in the name of Jesus Christ for the remission of sins. \n\nThe infilling of the Holy Ghost with the evidence of speaking in tongues. \n\nThe oneness of God manifested in Christ Jesus. \n\nThese truths, once lost to history, were now vibrant and alive. The stage was set for the formation of organized bodies to carry this message forward into the world."
      }
    ]
  },
  {
    id: "organizations",
    title: "Formation of Apostolic Organizations (1918–1945)",
    content: [
      {
        heading: "PAW and Early Structure (1918)",
        text:
          "In 1918, ministers who embraced Oneness doctrine united under the banner of the Pentecostal Assemblies of the World (PAW). The PAW became the first major Oneness organization, bringing together both white and black ministers in a time when segregation still plagued America. It emphasized baptism in Jesus’ name, holiness of life, and evangelism. \n\nAt its height in the 1920s, the PAW was racially integrated in a way that was radical for its time. Bishops such as G. T. Haywood, one of the greatest Apostolic preachers and writers of his day, provided strong leadership. Haywood’s songs, tracts, and preaching shaped the theology of an entire generation. His famous hymn “I See a Crimson Stream of Blood” is still sung today."
      },
      {
        heading: "Racial Tensions and New Bodies",
        text:
          "Yet, the racial unity of the PAW was short-lived. In the climate of Jim Crow segregation, many white ministers struggled to remain under black leadership. In the late 1920s and early 1930s, large numbers of white ministers withdrew to form new organizations. What had been a powerful integrated movement fractured along racial lines. \n\nIn 1931, some of these white ministers formed the Pentecostal Assemblies of Jesus Christ (PAJC). The PAJC carried forward the Oneness message with a strong emphasis on evangelism and missions. It became one of the largest white Oneness bodies, planting churches across the country and supporting missionaries overseas. \n\nAnother group of ministers organized as the Pentecostal Church, Inc. (PCI). Like the PAJC, it was a white-led fellowship that preached the same Oneness gospel of Acts 2:38. The PCI established Bible colleges, trained ministers, and held large camp meetings that drew thousands. \n\nMeanwhile, the PAW continued as a predominantly African-American fellowship after the exodus of many white ministers. Despite challenges, it remained a powerful voice for Apostolic truth. Its leaders—men like Bishop Samuel Grimes and Bishop Ross Paddock—ensured the PAW kept advancing at home and abroad. \n\nBy the early 1940s, Oneness Pentecostals were spread across multiple organizations: the PAW, the PAJC, the PCI, and other smaller groups. The message was the same, but division hampered cooperation. Evangelism thrived, but the dream of unity remained elusive.."
      },
      {
        heading: "Toward a Merger",
        text:
          "By the end of World War II, leaders recognized the need for a stronger, unified organization that could better support missions, Bible training, and evangelism. Years of prayer and negotiation would soon culminate in the most significant organizational merger in Apostolic history."
      }
    ]
  },
  {
    id: "upci",
    title: "UPCI Formation (1945)",
    content: [
        {
        heading: "The Dream of Unity",
        text:
          "By the mid-1940s, the Apostolic movement had grown dramatically, but it was divided among several fellowships. The Pentecostal Assemblies of Jesus Christ (PAJC) and the Pentecostal Church, Inc. (PCI) were the largest white-led Oneness bodies, while the Pentecostal Assemblies of the World (PAW) remained a strong and historic fellowship with predominantly African-American leadership. Though the message of Acts 2:38 was consistent across them all, organizational separation hindered greater cooperation in missions, evangelism, and training. \n\nLeaders in the PAJC and PCI began serious discussions about merging into one body. Their shared doctrine, common vision, and recognition of the need for strength in unity paved the way for what would become the largest Oneness Pentecostal fellowship in the world."
      },
      {
        heading: "St. Louis Merger",
        text:
          "In September 1945, representatives of the PAJC and PCI met in St. Louis, Missouri. After prayer, debate, and negotiation, the two organizations voted to unite. The merger created the United Pentecostal Church International (UPCI). This landmark decision combined resources, congregations, ministers, and vision into a single fellowship that could more effectively spread the Apostolic message. \n\nThe UPCI was founded with a clear commitment to the foundational apostolic doctrines: \n\nThe absolute oneness of God. \n\nSalvation through repentance, baptism in the name of Jesus Christ, and the infilling of the Holy Ghost with the initial sign of tongues. \n\nThe call to holiness in life and separation from the world. \n\nA burden for global evangelism and missionary work."
      },
      {
        heading: "Vision and Infrastructure",
        text:
          "The formation of the UPCI in 1945 was a watershed moment in Apostolic history. For the first time since the splinters of the 1920s and 30s, a major step toward unity had been achieved. While racial divisions still remained—particularly with the separation between UPCI and PAW—the merger of PCI and PAJC demonstrated what could happen when Apostolic believers chose to come together for the sake of the gospel. \n\nThe UPCI quickly became the largest and most influential Oneness Pentecostal body in the world. Its growth, both in North America and internationally, was exponential. The unity forged in 1945 still shapes the Apostolic landscape today."
      }
    ]
  },
  {
    id: "expansion",
    title: "Expansion & Separation (1945–1970s)",
    content: [
      {
        heading: "UPCI Growth",
        text:
          "After the 1945 merger, the United Pentecostal Church International rapidly established itself as a strong, unified fellowship. Its early decades were marked by revival, explosive church planting, and an aggressive push for world missions. UPCI missionaries planted works across Latin America, Africa, Asia, and Europe, carrying the Acts 2:38 message to countless new cultures. \n\nDomestically, UPCI churches grew rapidly in cities and rural areas alike. Camp meetings, revivals, and youth conventions became staples of Apostolic life, bringing thousands together to celebrate and experience the power of God. Bible colleges like Gateway, Texas Bible College, and Western Apostolic Bible College trained ministers who would carry the message across generations."
      },
      {
        heading: "PAW and New Fellowships",
        text:
          "While the UPCI became the largest Oneness body, the Pentecostal Assemblies of the World (PAW) remained a powerful fellowship. Having endured the loss of many white ministers in the 1920s and 1930s, the PAW solidified as a primarily African-American body. Leaders such as Bishop Samuel Grimes and later Bishop Ross Paddock carried forward the message with strength. \n\nThe PAW also contributed greatly to global missions. Despite racial segregation in the United States, its influence was not confined by color lines overseas. The PAW’s bishops and evangelists helped spread the Apostolic message in the Caribbean, Africa, and beyond."
      },
      {
        heading: "The Emergence of New Fellowships",
        text:
          "Even as UPCI and PAW solidified, new fellowships emerged in the mid-20th century, often sparked by personality conflicts, leadership disputes, or racial divisions. \n\nPentecostal Churches of the Apostolic Faith (PCAF, 1957): Founded in the wake of leadership disagreements within the PAW, this body became another significant African-American fellowship. Bishop Samuel Grimes played a role in its early years, and it has since developed its own strong identity. \n\nBible Way Churches of Our Lord Jesus Christ (1957): Founded by Smallwood E. Williams and others after further disputes within the PAW, this fellowship spread rapidly, particularly along the East Coast of the United States. \n\nOther Independent Apostolic Fellowships: Many smaller groups formed during this era, reflecting both the vitality and the fragmentation of the Apostolic movement."
      },
      {
        heading: "Challenges and Opportunities",
        text:
          "While the Word of God was spreading and the Apostolic message was experiencing global growth, the proliferation of fellowships highlighted the persistent challenge of division. Racial segregation, leadership rivalries, and differing visions for governance often pulled brethren apart. Yet, despite organizational divides, the doctrine remained remarkably consistent: repentance, baptism in Jesus’ name, the infilling of the Holy Ghost, and the call to holiness. \n\nThis period also witnessed massive revival campaigns that propelled the Apostolic message into the public eye. Evangelists such as Billy Cole, J. T. Pugh, and others preached crusades that filled stadiums overseas. In America, large tent revivals, camp meetings, and healing services drew thousands. The healing revival of the 1940s–50s swept across Pentecostalism, and while some leaders like William Branham drifted into doctrinal error, Apostolic preachers emphasized the balance of Word and Spirit, keeping revival anchored in Acts 2:38. \n\nBy the 1970s, Apostolic organizations were firmly established worldwide. In Africa, Asia, and Latin America, indigenous leaders rose to prominence. Churches were planted in major world capitals as well as remote villages. The Apostolic witness was no longer a fringe movement—it was becoming a global force. \n\nEven amid separation, seeds of unity were sown. In 1971, the Apostolic World Christian Fellowship (AWCF) was formed as a loose network to provide a common platform for fellowship across organizational lines. Leaders recognized that while structures might differ, the shared truth of Acts 2:38 could serve as a uniting bond."

      }
    ]
  },
  {
    id: "present",
    title: "Late 20th Century – Present",
    content: [
      {
        heading: "Continued Growth of the UPCI",
        text:
          "From the 1970s onward, the United Pentecostal Church International surged in size and scope. Its missionary arm expanded into virtually every nation, training leaders and planting churches across Africa, Asia, Latin America, and Europe. Bible schools multiplied, producing ministers rooted in Apostolic doctrine. Global conferences—like Because of the Times, North American Youth Congress, and General Conference—became major gatherings that inspired and equipped new generations. \n\nThe UPCI emphasized three key areas: evangelism, missions, and holiness. In evangelism, churches launched bus ministries, radio programs, and later television and online outreach. In missions, the UPCI poured resources into sending missionaries and supporting indigenous leaders, often seeing explosive growth in developing nations. In holiness, the fellowship continued to stress separation from the world while also engaging contemporary culture with bold preaching and teaching."
      },
      {
        heading: "The PAW in the Modern Era",
        text:
          "The Pentecostal Assemblies of the World remained a powerful Apostolic body. Its bishops and pastors oversaw thousands of congregations, particularly among African-American believers in the United States. The PAW’s national conventions drew tens of thousands, featuring dynamic preaching and worship. It too expanded internationally, spreading the Jesus’ name message far beyond North America."
      },
      {
        heading: "The Apostolic World Christian Fellowship (AWCF, 1971)",
        text:
          "In 1971, leaders from across Apostolic fellowships formed the Apostolic World Christian Fellowship (AWCF). The AWCF was not designed to replace existing organizations but to provide a cooperative platform where Oneness believers of all stripes could work together for evangelism and fellowship. The AWCF became a symbol that while divisions existed, the core of Acts 2:38 truth united the body."
      },
      {
        heading: "The Charismatic Movement and Apostolic Identity",
        text:
          "In the late 20th century, the Charismatic movement swept through Catholic and Protestant churches alike. Millions testified of Spirit baptism and speaking in tongues. While this brought Pentecostal experience into the mainstream, Apostolic leaders warned that experience without doctrine could not replace the full new birth. The Apostolic movement emphasized that tongues were not enough—repentance, baptism in the name of Jesus, and holiness remained essential."
      },
      {
        heading: "Global Explosion of Apostolic Churches",
        text:
          "By the end of the 20th century, Apostolic believers numbered in the tens of millions worldwide. Nations like the Philippines, Ethiopia, Brazil, and India saw massive revival. Entire regions were transformed by the message of Jesus’ name baptism and Spirit infilling. Indigenous leaders emerged, often planting hundreds of churches and discipling thousands."
      },
      {
        heading: "The Digital Age and 21st Century",
        text:
          "As the 21st century began, Apostolic fellowships embraced new tools for spreading the gospel. Online resources, live-streamed services, social media, and digital Bible studies made it possible to reach people globally without stepping on a plane. The Apostolic message is now preached daily through podcasts, livestreams, and online teaching."
      },
      {
        heading: "Unity and Identity in a Postmodern World",
        text:
          "Apostolic believers today face new challenges: secularism, relativism, and cultural pressures to compromise biblical truth. Yet the call remains the same: to earnestly contend for the faith once delivered to the saints. Across fellowships—UPCI, PAW, PCAF, Bible Way, and many others—the heartbeat of Acts 2:38 still unites. Cooperative gatherings like the AWCF demonstrate that while organizations differ, the One God and one gospel remain unchanged. \n\nToday, Apostolic Pentecostals are one of the fastest-growing segments of Christianity. Millions around the world testify of repentance, water baptism in the name of Jesus, and the baptism of the Holy Ghost with the evidence of tongues. What began in an upper room in Jerusalem has spread to every continent. The same crimson stream of blood that G. T. Haywood wrote about still flows, cleansing sinners and filling them with power. \n\nFrom Pentecost to the present, the message has remained the same: one God, one gospel, one name. The rise of councils and creeds could not erase it. The darkness of the medieval church could not extinguish it. The fires of persecution could not consume it. The Spirit has ensured that in every generation, somewhere, someone has proclaimed Jesus’ name and the Acts 2:38 pattern."
      }
    ]
  }
];

export default function TimelinePage() {
  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-12 sm:pt-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_35px_90px_-65px_rgba(15,23,42,0.85)] backdrop-blur">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/70">
              <span className="inline-flex h-2 w-2 rounded-full bg-indigo-400" />
              Apostolic Truth Timeline
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-white/95">
              From Pentecost to the present, one message continues unchanged.
            </h1>
            <p className="mt-2 max-w-3xl text-white/80">
              A long-form, researchable history of Apostolic doctrine and practice.
              Use the Contents to jump by era and follow the narrative section by section.
            </p>
            <div className="mt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/85 hover:bg-white/[0.06] hover:border-white/15 transition"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>

        {/* Content grid */}
        <section className="relative mt-10 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* TOC */}
          <aside className="lg:col-span-3 lg:block">
            <div className="sticky top-20 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
              <div className="text-xs uppercase tracking-[0.28em] text-white/65">Contents</div>
              <nav className="mt-3 space-y-2 text-sm">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-md px-2 py-1 text-white/85 hover:bg-white/[0.06] hover:text-white/95"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Timeline body */}
          <div className="mt-8 space-y-12 lg:mt-0 lg:col-span-9">
            {SECTIONS.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_35px_90px_-65px_rgba(15,23,42,0.85)] backdrop-blur"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/70">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  {sec.title}
                </div>

                <div className="relative mt-6">
                  {/* vertical spine */}
                  <span className="absolute left-3 top-0 h-full w-px bg-white/10" aria-hidden="true" />
                  <ol className="space-y-6">
                    {sec.content.map((item, i) => (
                      <li key={i} className="relative pl-8">
                        <span className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15" />
                        <h3 className="text-white/95 text-base font-semibold">{item.heading}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/85 whitespace-pre-line">
  {item.text}
</p>

                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            ))}

            {/* Attribution */}
            <section className="mb-16">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/75">
                Much of the detailed chronology in this timeline has been adapted from{" "}
                <em>Apostolic Faith and Pentecostal Timetable of Key Events</em>, compiled by{" "}
                <strong>Bernie L. Wade, Ph.D.</strong> (Apostolic historian; Apostolic Archives board).
                Adapted here into narrative form for study/teaching.
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
