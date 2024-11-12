import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
    Linking,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


const Education = () => {
    const images = [
    
        // Class 1
    { title: 'class1NcertEnglish', url: 'https://ncert.nic.in/textbook/pdf/aemr1cc.jpg' },
        { title: 'class1NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/aejm1cc.jpg' },
        { title: 'class1NcertHindi', url: 'https://ncert.nic.in/textbook/pdf/ahsr1cc.jpg' },
        { title: 'class1NcertUrdu', url: 'https://ncert.nic.in/textbook/pdf/aush1cc.jpg' },

        // Class 2
    { title: 'class2NcertEnglish', url: 'https://ncert.nic.in/textbook/pdf/bemr1cc.jpg' },
        { title: 'class2NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/bejm1cc.jpg' },
        { title: 'class2NcertHindi', url: 'https://ncert.nic.in/textbook/pdf/bhsr1cc.jpg' },
    { title: 'class2NcertUrdu', url: 'https://ncert.nic.in/textbook/pdf/bush1cc.jpg' },
        
        // Class 3
    { title: 'class3NcertEnglish', url: 'https://ncert.nic.in/textbook/pdf/cesa1cc.jpg' },
        { title: 'class3NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/cemm1cc.jpg' },
        { title: 'class3NcertHindi', url: 'https://ncert.nic.in/textbook/pdf/chve1cc.jpg' },
        { title: 'class3NcertWorldAroundUs', url: 'https://ncert.nic.in/textbook/pdf/ceev1cc.jpg' },
        { title: 'class3NcertArts', url: 'https://ncert.nic.in/textbook/pdf/cebu1cc.jpg' },
        { title: 'class3NcertPhysicalEducationAndWellBeing', url: 'https://ncert.nic.in/textbook/pdf/ceky1cc.jpg' },
        { title: 'class3NcertUrdu', url: 'https://ncert.nic.in/textbook/pdf/cust1cc.jpg' },
       
        // Class 4
    { title: 'class4NcertEnglish', url: 'https://ncert.nic.in/textbook/pdf/deen1cc.jpg' },
        { title: 'class4NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/demh1cc.jpg' },
        { title: 'class4NcertHindi', url: 'https://ncert.nic.in/textbook/pdf/dhhn1cc.jpg' },
        { title: 'class4NcertEnvironmentalStudies', url: 'https://ncert.nic.in/textbook/pdf/deap1cc.jpg' },
        { title: 'class4NcertUrdu', url: 'https://ncert.nic.in/textbook/pdf/dulb1cc.jpg' },
       
        // Class 5
    { title: 'class5NcertEnglish', url: 'https://ncert.nic.in/textbook/pdf/eeen1cc.jpg' },
        { title: 'class5NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/eemh1cc.jpg' },
        { title: 'class5NcertHindi', url: 'https://ncert.nic.in/textbook/pdf/ehhn1cc.jpg' },
    { title: 'class5NcertEnvironmentalStudies', url: 'https://ncert.nic.in/textbook/pdf/eeap1cc.jpg' },
    { title: 'class5NcertUrdu', url: 'https://ncert.nic.in/textbook/pdf/eulb1cc.jpg' },
       
        // Class 6
    { title: 'class6NcertEnglish', url: 'https://ncert.nic.in/textbook/pdf/fepr1cc.jpg' },
        { title: 'class6NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/fegp1cc.jpg' },
        { title: 'class6NcertHindi', url: 'https://ncert.nic.in/textbook/pdf/fhml1cc.jpg' },
        { title: 'class6NcertSocialScience', url: 'https://ncert.nic.in/textbook/pdf/fees1cc.jpg' },
        { title: 'class6NcertSanskrit', url: 'https://ncert.nic.in/textbook/pdf/fsde1cc.jpg' },
        { title: 'class6NcertScience', url: 'https://ncert.nic.in/textbook/pdf/fecu1cc.jpg' },
        { title: 'class6NcertArts', url: 'https://ncert.nic.in/textbook/pdf/fekr1cc.jpg' },
        { title: 'class6NcertPhysicalEducationAndWellBeing', url: 'https://ncert.nic.in/textbook/pdf/feky1cc.jpg' },
        { title: 'class6NcertVocationalEducation', url: 'https://ncert.nic.in/textbook/pdf/fekb1cc.jpg' },
        { title: 'class6NcertUrdu', url: 'https://ncert.nic.in/textbook/pdf/fuky1cc.jpg' },
       
        // Class 7
    { title: 'class7NcertEnglishReader', url: 'https://ncert.nic.in/textbook/pdf/geah1cc.jpg' },
    { title: 'class7NcertEnglishGrammar', url: 'https://ncert.nic.in/textbook/pdf/gehc1cc.jpg' },
        { title: 'class7NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/gemh1cc.jpg' },
        { title: 'class7NcertHindiReader', url: 'https://ncert.nic.in/textbook/pdf/ghvs1cc.jpg' },
        { title: 'class7NcertHindiGrammar', url: 'https://ncert.nic.in/textbook/pdf/ghdv1cc.jpg' },
        { title: 'class7NcertHindiMahabharat', url: 'https://ncert.nic.in/textbook/pdf/ghmb1cc.jpg' },
        { title: 'class7NcertUrduApniZaban', url: 'https://ncert.nic.in/textbook/pdf/guaz1cc.jpg' },
        { title: 'class7NcertUrduGuldasta-Suppl', url: 'https://ncert.nic.in/textbook/pdf/gugu1cc.jpg' },
        { title: 'class7NcertUrduDoor-Pass', url: 'https://ncert.nic.in/textbook/pdf/gudp1cc.jpg' },
        { title: 'class7NcertUrduJaanPahechan', url: 'https://ncert.nic.in/textbook/pdf/gujp1cc.jpg' },
        { title: 'class7NcertScience', url: 'https://ncert.nic.in/textbook/pdf/gesc1cc.jpg' },
        { title: 'class7NcertSocialScienceCivics', url: 'https://ncert.nic.in/textbook/pdf/gess3cc.jpg' },
        { title: 'class7NcertSocialScienceHistory', url: 'https://ncert.nic.in/textbook/pdf/gess1cc.jpg' },
        { title: 'class7NcertSocialScienceGeography', url: 'https://ncert.nic.in/textbook/pdf/gess2cc.jpg' },
        { title: 'class7NcertSanskrit', url: 'https://ncert.nic.in/textbook/pdf/ghsk1cc.jpg' },
       
        // Class 8
    { title: 'class8NcertEnglishHoneydew', url: 'https://ncert.nic.in/textbook/pdf/hehd1cc.jpg' },
    { title: 'class8NcertEnglishItSoHappend', url: 'https://ncert.nic.in/textbook/pdf/heih1cc.jpg' },
        { title: 'class8NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/hemh1cc.jpg' },
        { title: 'class8NcertHindiVasant', url: 'https://ncert.nic.in/textbook/pdf/hhvs1cc.jpg' },
        { title: 'class8NcertHindiDruva', url: 'https://ncert.nic.in/textbook/pdf/hhdv1cc.jpg' },
        { title: 'class8NcertHindiBharatKiKhoj', url: 'https://ncert.nic.in/textbook/pdf/hhbk1cc.jpg' },
        { title: 'class8NcertHindiSanshiptBudhcharit', url: 'https://ncert.nic.in/textbook/pdf/hhsb1cc.jpg' },
        { title: 'class8NcertScience', url: 'https://ncert.nic.in/textbook/pdf/hesc1cc.jpg' },
        { title: 'class8NcertSocialScienceCivics', url: 'https://ncert.nic.in/textbook/pdf/hess3cc.jpg' },
        { title: 'class8NcertSocialScienceHistory', url: 'https://ncert.nic.in/textbook/pdf/hess2cc.jpg' },
        { title: 'class8NcertSocialScienceGeography', url: 'https://ncert.nic.in/textbook/pdf/hess4cc.jpg' },
       { title: 'class8NcertUrduApniZaban', url: 'https://ncert.nic.in/textbook/pdf/huaz1cc.jpg' },
        { title: 'class8NcertUrduGuldasta-Suppl', url: 'https://ncert.nic.in/textbook/pdf/huug1cc.jpg' },
        { title: 'class8NcertUrduDoor-Pass', url: 'https://ncert.nic.in/textbook/pdf/hudp1cc.jpg' },
        { title: 'class8NcertUrduJaanPahechan', url: 'https://ncert.nic.in/textbook/pdf/hujp1cc.jpg' },
        
        // Class 9
    { title: 'class9NcertEnglishBeehive', url: 'https://ncert.nic.in/textbook/pdf/iebe1cc.jpg' },
    { title: 'class9NcertEnglishMovementSupplementryReader', url: 'https://ncert.nic.in/textbook/pdf/iemo1cc.jpg' },
    { title: 'class9NcertEnglishWordsAndExpressions1', url: 'https://ncert.nic.in/textbook/pdf/iewe1cc.jpg' },
        { title: 'class9NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/iemh1cc.jpg' },
        { title: 'class9NcertHindiKshitij', url: 'https://ncert.nic.in/textbook/pdf/ihks1cc.jpg' },
        { title: 'class9NcertHindiSparsh', url: 'https://ncert.nic.in/textbook/pdf/ihsp1cc.jpg' },
        { title: 'class9NcertHindiKritika', url: 'https://ncert.nic.in/textbook/pdf/ihkr1cc.jpg' },
        { title: 'class9NcertHindiSanchayan', url: 'https://ncert.nic.in/textbook/pdf/ihsa1cc.jpg' },
        { title: 'class9NcertUrduGulzare-e-urdu', url: 'https://ncert.nic.in/textbook/pdf/iugu1cc.jpg' },
        { title: 'class9NcertUrduNawa-e-urdu', url: 'https://ncert.nic.in/textbook/pdf/iuna1cc.jpg' },
        { title: 'class9NcertUrduJaanPahechan', url: 'https://ncert.nic.in/textbook/pdf/iujp1cc.jpg' },
        { title: 'class9NcertUrduDoorPass', url: 'https://ncert.nic.in/textbook/pdf/iudp1cc.jpg' },
        { title: 'class9NcertUrduSabRang', url: 'https://ncert.nic.in/textbook/pdf/iusr1cc.jpg' },
        { title: 'class9NcertUrduUrduKiAdabiAsnaf', url: 'https://ncert.nic.in/textbook/pdf/iuau1cc.jpg' },
        { title: 'class9NcertSanskritShemushiPratmoBhag', url: 'https://ncert.nic.in/textbook/pdf/ihsh1cc.jpg' },
        { title: 'class9NcertSanskritVyakaranavithi', url: 'https://ncert.nic.in/textbook/pdf/jhva1cc.jpg' },
        { title: 'class9NcertSanskritAbhayaswaanBhav', url: 'https://ncert.nic.in/textbook/pdf/isab1cc.jpg' },
        { title: 'class9NcertScience', url: 'https://ncert.nic.in/textbook/pdf/iesc1cc.jpg' },
       { title: 'class9NcertSocialScienceDemocraticPolitics', url: 'https://ncert.nic.in/textbook/pdf/iess4cc.jpg' },
        { title: 'class9NcertSocialScienceContemporaryIndia', url: 'https://ncert.nic.in/textbook/pdf/hess2cc.jpg' },
        { title: 'class9NcertSocialScienceEconomics', url: 'https://ncert.nic.in/textbook/pdf/iess2cc.jpg' },
        { title: 'class9NcertSocialScienceIndiaAndContemporaryWorld1', url: 'https://ncert.nic.in/textbook/pdf/iess3cc.jpg' },
        { title: 'class9NcertHealthAndPhysicalEducation', url: 'https://ncert.nic.in/textbook/pdf/iehp1cc.jpg' },
        { title: 'class9NcertIct', url: 'https://ncert.nic.in/textbook/pdf/iict1cc.jpg'},

        // Class 10
    { title: 'class10NcertEnglishFirstFlight', url: 'https://ncert.nic.in/textbook/pdf/jeff1cc.jpg' },
    { title: 'class10NcertEnglishFootprintsWithoutFeetSuppReader', url: 'https://ncert.nic.in/textbook/pdf/jefp1cc.jpg' },
    { title: 'class10NcertEnglishWordsAndExpressions2', url: 'https://ncert.nic.in/textbook/pdf/jewe2cc.jpg' },
        { title: 'class10NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/jemh1cc.jpg' },
        { title: 'class10NcertUrdu', url: '' },
    { title: 'class10NcertScience', url: 'https://ncert.nic.in/textbook/pdf/jesc1cc.jpg'},
       { title: 'class10NcertHindiKshitij2', url: 'https://ncert.nic.in/textbook/pdf/jhks1cc.jpg' },
        { title: 'class10NcertHindiSparsh', url: 'https://ncert.nic.in/textbook/pdf/jhsp1cc.jpg' },
        { title: 'class10NcertHindiKritika', url: 'https://ncert.nic.in/textbook/pdf/jhkr1cc.jpg' },
        { title: 'class10NcertHindiSanchayanBhag2', url: 'https://ncert.nic.in/textbook/pdf/jhsy1cc.jpg' },
        { title: 'class10NcertSocialScienceContemporaryIndia', url: 'https://ncert.nic.in/textbook/pdf/jess1cc.jpg' },
        { title: 'class10NcertSocialScienceUnderstandingEconomicDevelopment', url: 'https://ncert.nic.in/textbook/pdf/jess2cc.jpg' },
        { title: 'class10NcertSocialScienceIndiaAndTheContemporaryWorld2', url: 'https://ncert.nic.in/textbook/pdf/jess3cc.jpg' },
       { title: 'class10NcertSocialScienceDemocraticPolitics', url: 'https://ncert.nic.in/textbook/pdf/jess4cc.jpg' },
       { title: 'class10NcertSanskritShemushi', url: 'https://ncert.nic.in/textbook/pdf/jhsk1cc.jpg' },
        { title: 'class10NcertSanskritVyakaranavithi', url: 'https://ncert.nic.in/textbook/pdf/jhva1cc.jpg' },
        { title: 'class10NcertSanskritAbhayaswaanBhav2', url: 'https://ncert.nic.in/textbook/pdf/jsab1cc.jpg' },
        { title: 'class10NcertUrduGulzare-e-urdu', url: 'https://ncert.nic.in/textbook/pdf/juge1cc.jpg' },
        { title: 'class10NcertUrduNawa-e-urdu', url: 'https://ncert.nic.in/textbook/pdf/june1cc.jpg' },
        { title: 'class10NcertUrduJaanPahechan', url: 'https://ncert.nic.in/textbook/pdf/jujp1cc.jpg' },
        { title: 'class10NcertUrduDoorPass', url: 'https://ncert.nic.in/textbook/pdf/judp1cc.jpg' },
        { title: 'class10NcertUrduSabRang', url: 'https://ncert.nic.in/textbook/pdf/jusr1cc.jpg' },
        { title: 'class10NcertHealthAndPhysicalEducation', url: 'https://ncert.nic.in/textbook/pdf/jehp1cc.jpg' },

        // Class 11
        { title: 'class11NcertSanskritBhaswati', url: 'https://ncert.nic.in/textbook/pdf/khsk1cc.jpg'},
        { title: 'class11NcertSanskritShaswati', url: 'https://ncert.nic.in/textbook/pdf/khsk2cc.jpg'},
        { title: 'class11NcertAccountancyFinancialAccounting1', url: 'https://ncert.nic.in/textbook/pdf/keac1cc.jpg'},
        { title: 'class11NcertAccountancyAccountancy2', url: 'https://ncert.nic.in/textbook/pdf/keac2cc.jpg'},
        { title: 'class11NcertChemistryChemistryPart1', url: 'https://ncert.nic.in/textbook/pdf/kech1cc.jpg' },
        { title: 'class11NcertChemistryChemistryPart2', url: 'https://ncert.nic.in/textbook/pdf/kech2cc.jpg' },
        { title: 'class11NcertMathematics', url: 'https://ncert.nic.in/textbook/pdf/kemh1cc.jpg' },
        { title: 'class11NcertBiology', url: 'https://ncert.nic.in/textbook/pdf/kebo1cc.jpg' },
        { title: 'class11NcertPsychologyIntroductionToPsychology', url: 'https://ncert.nic.in/textbook/pdf/kepy1cc.jpg' },
        { title: 'class11NcertGeographyFundamentalOfPhysicalGeography', url: 'https://ncert.nic.in/textbook/pdf/kegy2cc.jpg' },
        { title: 'class11NcertGeographyPracticalWorkInGeography', url: 'https://ncert.nic.in/textbook/pdf/kegy3cc.jpg' },
        { title: 'class11NcertGeographyIndiaPhysicalEnvironment', url: 'https://ncert.nic.in/textbook/pdf/kegy1cc.jpg' },
        { title: 'class11NcertPhysicsPhysicsPart1', url: 'https://ncert.nic.in/textbook/pdf/keph1cc.jpg' },
        { title: 'class11NcertPhysicsPhysicsPart2', url: 'https://ncert.nic.in/textbook/pdf/keph2cc.jpg' },
        { title: 'class11NcertHindiAntra', url: 'https://ncert.nic.in/textbook/pdf/khat1cc.jpg' },
        { title: 'class11NcertHindiAroh', url: 'https://ncert.nic.in/textbook/pdf/khar1cc.jpg' },
        { title: 'class11NcertHindiVitan', url: 'https://ncert.nic.in/textbook/pdf/khvt1cc.jpg' },
        { title: 'class11NcertHindiAntral', url: 'https://ncert.nic.in/textbook/pdf/khan1cc.jpg' },
        { title: 'class11NcertSociologyIntroductionToSociology', url: 'https://ncert.nic.in/textbook/pdf/kesy1cc.jpg' },
        { title: 'class11NcertSociologyUnderstandingSociety', url: 'https://ncert.nic.in/textbook/pdf/kesy2cc.jpg' },
        { title: 'class11NcertEnglishWovenWords', url: 'https://ncert.nic.in/textbook/pdf/keww1cc.jpg' },
        { title: 'class11NcertEnglishHornbill', url: 'https://ncert.nic.in/textbook/pdf/kehb1cc.jpg' },
        { title: 'class11NcertEnglishSnapshotsSupplReaderEnglish', url: 'https://ncert.nic.in/textbook/pdf/kesp1cc.jpg' },
        { title: 'class11NcertCivicsPoliticalTheory', url: 'https://ncert.nic.in/textbook/pdf/keps1cc.jpg' },
        { title: 'class11NcertCivicsIndiaConstitutionAtWork', url: 'https://ncert.nic.in/textbook/pdf/keps2cc.jpg' },
        { title: 'class11NcertHistoryThemesInWorldHistory', url: 'https://ncert.nic.in/textbook/pdf/kehs1cc.jpg' },
        { title: 'class11NcertEconomicsIndianEconomicDevelopment', url: 'https://ncert.nic.in/textbook/pdf/keec1cc.jpg' },
        { title: 'class11NcertEconomicsStaticsForEconomics', url: 'https://ncert.nic.in/textbook/pdf/kest1cc.jpg' },
        { title: 'class11NcertBusinessStudies', url: 'https://ncert.nic.in/textbook/pdf/kebs1cc.jpg' },
        { title: 'class11NcertUrduNaiAwaz', url: 'https://ncert.nic.in/textbook/pdf/kuna1cc.jpg' },
        { title: 'class11NcertUrduDhanak', url: 'https://ncert.nic.in/textbook/pdf/kudh1cc.jpg' },
        { title: 'class11NcertUrduGulistanEAdab', url: 'https://ncert.nic.in/textbook/pdf/kuga1cc.jpg' },
        { title: 'class11NcertUrduKhyabaneUrdu', url: 'https://ncert.nic.in/textbook/pdf/kuku1cc.jpg' },
        { title: 'class11NcertHomeScienceHumanEcologyAndFamilySciencesPart1', url: 'https://ncert.nic.in/textbook/pdf/kehe1cc.jpg' },
        { title: 'class11NcertHomeScienceHumanEcologyAndFamilySciencesPart2', url: 'https://ncert.nic.in/textbook/pdf/kehe2cc.jpg' },
        { title: 'class11NcertCreativeAndWritingTranslationSrijan', url: 'https://ncert.nic.in/textbook/pdf/khsr1cc.jpg' },
        { title: 'class11NcertFineArtAnIntroductionToIndianArtPart1', url: 'https://ncert.nic.in/textbook/pdf/kefa1cc.jpg' },
        { title: 'class11NcertInformaticsPractices', url: 'https://ncert.nic.in/textbook/pdf/keip1cc.jpg' },
        { title: 'class11NcertComputerScience', url: 'https://ncert.nic.in/textbook/pdf/kucs1cc.jpg' },
        { title: 'class11NcertHealthAndPhysicalEducation', url: 'https://ncert.nic.in/textbook/pdf/keip1cc.jpg' },
        { title: 'class11NcertBiotechnology', url: 'https://ncert.nic.in/textbook/pdf/kebt1cc.jpg' },
        { title: 'class11NcertSangeetTablaEvamPakhawj', url: 'https://ncert.nic.in/textbook/pdf/khtp1cc.jpg' },
        { title: 'class11NcertSangeetHindustanSangeetGyanEvamVadan', url: 'https://ncert.nic.in/textbook/pdf/khgv1cc.jpg' },
        { title: 'class11NcertKnowledgeTraditionsPracticesOfIndia', url: 'https://ncert.nic.in/textbook/pdf/keks1cc.jpg' },
        
        // Class 12
        { title: 'class12NcertMathematicsPart1', url: 'https://ncert.nic.in/textbook/pdf/lemh1cc.jpg' },
        { title: 'class12NcertMathematicsPart2', url: 'https://ncert.nic.in/textbook/pdf/lemh2cc.jpg' },
        { title: 'class12NcertPhysicsPhysicsPart1', url: 'https://ncert.nic.in/textbook/pdf/leph1cc.jpg' },
        { title: 'class12NcertPhysicsPhysicsPart2', url: 'https://ncert.nic.in/textbook/pdf/leph2cc.jpg' },
        { title: 'class12NcertAccountancyAccountancy1', url: 'https://ncert.nic.in/textbook/pdf/leac1cc.jpg'},
        { title: 'class12NcertAccountancyAccountancyPart2', url: 'https://ncert.nic.in/textbook/pdf/leac2cc.jpg' },
        { title: 'class12NcertSanskritBhaswati', url: 'https://ncert.nic.in/textbook/pdf/lhsk1cc.jpg'},
        { title: 'class12NcertSanskritShaswati', url: 'https://ncert.nic.in/textbook/pdf/lhsk2cc.jpg' },
        { title: 'class12NcertHindiAntra', url: 'https://ncert.nic.in/textbook/pdf/lhat1cc.jpg' },
        { title: 'class12NcertHindiAroh', url: 'https://ncert.nic.in/textbook/pdf/lhar1cc.jpg' },
        { title: 'class12NcertHindiVitan', url: 'https://ncert.nic.in/textbook/pdf/lhvt1cc.jpg' },
        { title: 'class12NcertHindiAntralBhag2', url: 'https://ncert.nic.in/textbook/pdf/lhan1cc.jpg' },
    { title: 'class12NcertEnglishKaliedoscope', url: 'https://ncert.nic.in/textbook/pdf/lekl1cc.jpg' },
    { title: 'class12NcertEnglishFlamingo', url: 'https://ncert.nic.in/textbook/pdf/lefl1cc.jpg' },
    { title: 'class12NcertEnglishVistas', url: 'https://ncert.nic.in/textbook/pdf/levt1cc.jpg' },
        { title: 'class12NcertBiology', url: 'https://ncert.nic.in/textbook/pdf/lebo1cc.jpg' },
    { title: 'class12NcertHistoryThemesInIndianHistory1', url: 'https://ncert.nic.in/textbook/pdf/lehs1cc.jpg' },
    { title: 'class12NcertHistoryThemesInIndianHistory2', url: 'https://ncert.nic.in/textbook/pdf/lehs2cc.jpg' },
        { title: 'class12NcertHistoryThemesInIndianHistory3', url: 'https://ncert.nic.in/textbook/pdf/lehs3cc.jpg' },
     { title: 'class12NcertGeographyFundamentalsOfHumanGeography', url: 'https://ncert.nic.in/textbook/pdf/legy1cc.jpg' },
        { title: 'class12NcertGeographyPracticalWorkInGeographyPart2', url: 'https://ncert.nic.in/textbook/pdf/legy3cc.jpg' },
        { title: 'class12NcertGeographyIndiaPeopleAndEconomy', url: 'https://ncert.nic.in/textbook/pdf/legy2cc.jpg' },
        { title: 'class12NcertPsychologyIntroductionToPsychology', url: 'https://ncert.nic.in/textbook/pdf/lepy1cc.jpg' },
        { title: 'class12NcertSociologyIndianSociety', url: 'https://ncert.nic.in/textbook/pdf/lesy1cc.jpg' },
        { title: 'class12NcertSocialChangeAndDevelopmentInIndia', url: 'https://ncert.nic.in/textbook/pdf/lesy1cc.jpg' },
        { title: 'class12NcertChemistryChemistryPart1', url: 'https://ncert.nic.in/textbook/pdf/lech1cc.jpg' },
        { title: 'class12NcertChemistryChemistryPart2', url: 'https://ncert.nic.in/textbook/pdf/lech2cc.jpg' },
        { title: 'class12NcertCivicsContemporayWorldPolitics', url: 'https://ncert.nic.in/textbook/pdf/leps1cc.jpg' },
        { title: 'class12NcertCivicsPoliticsInIndiaSinceIndependence', url: 'https://ncert.nic.in/textbook/pdf/leps2cc.jpg' },
        { title: 'class12NcertEconomicsIntroductoryMicroeconomics', url: 'https://ncert.nic.in/textbook/pdf/leec2cc.jpg' },
        { title: 'class12NcertEconomicsIntroductoryMacroeconomics', url: 'https://ncert.nic.in/textbook/pdf/leec1cc.jpg' },
        { title: 'class12NcertBusinessStudies1', url: 'https://ncert.nic.in/textbook/pdf/lebs1cc.jpg' },
        { title: 'class12NcertBusinessStudies2', url: 'https://ncert.nic.in/textbook/pdf/lebs2cc.jpg' },
        { title: 'class12NcertHomeScienceHumanEcologyAndFamilySciencesPart1', url: 'https://ncert.nic.in/textbook/pdf/lehe1cc.jpg' },
        { title: 'class12NcertHomeScienceHumanEcologyAndFamilySciencesPart2', url: 'https://ncert.nic.in/textbook/pdf/lehe2cc.jpg' },
        { title: 'class12NcertUrduGulistanEAdab', url: 'https://ncert.nic.in/textbook/pdf/luga1cc.jpg' },
        { title: 'class12NcertUrduKhyabaneUrdu', url: 'https://ncert.nic.in/textbook/pdf/luku1cc.jpg' },
        { title: 'class12NcertUrduNaiAwaz', url: 'https://ncert.nic.in/textbook/pdf/luna1cc.jpg' },
        { title: 'class12NcertUrduDhanak', url: 'https://ncert.nic.in/textbook/pdf/ludh1cc.jpg' },
        { title: 'class12NcertCreativeAndWritingTranslationSrijan2', url: 'https://ncert.nic.in/textbook/pdf/khsr2cc.jpg' },
        { title: 'class12NcertFineArtAnIntroductionToIndianArtPart2', url: 'https://ncert.nic.in/textbook/pdf/lefa1cc.jpg' },
        { title: 'class12NcertComputerScience', url: 'https://ncert.nic.in/textbook/pdf/lecs1cc.jpg' },
        { title: 'class12NcertInformaticsPractices', url: 'https://ncert.nic.in/textbook/pdf/leip1cc.jpg' },
        { title: 'class12NcertBiotechnology', url: 'https://ncert.nic.in/textbook/pdf/lebt1cc.jpg' },
    { title: 'class12NcertSangeetTablaEvamPakhawj', url: 'https://ncert.nic.in/textbook/pdf/lstp1cc.jpg' },
        { title: 'class12NcertSangeetHindustanSangeetGyanEvamVadan', url: 'https://ncert.nic.in/textbook/pdf/lsgv1cc.jpg' },
];
function getImageUrlByTitle(title) {
    const image = images.find(img => img.title === title);
    return image ? image.url : null; // Returns the URL or null if not found
}
  const route = useRoute();
  const mobileNumber = route.params?.mobileNumber;
  const fullMobileNumber = "+" + mobileNumber.replace(/\s+/g, "");
    const [isClass1Visible, setIsClass1Visible] = useState(false);
    const [isClass2Visible, setIsClass2Visible] = useState(false);
    const [isClass3Visible, setIsClass3Visible] = useState(false);
    const [isClass4Visible, setIsClass4Visible] = useState(false);
    const [isClass5Visible, setIsClass5Visible] = useState(false);
    const [isClass6Visible, setIsClass6Visible] = useState(false);
    const [isClass7Visible, setIsClass7Visible] = useState(false);
    const [isClass8Visible, setIsClass8Visible] = useState(false);
    const [isClass9Visible, setIsClass9Visible] = useState(false);
    const [isClass10Visible, setIsClass10Visible] = useState(false);
    const [isClass11Visible, setIsClass11Visible] = useState(false);
    const [isClass12Visible, setIsClass12Visible] = useState(false);
    const ScreenHeight = Dimensions.get("window").height;
    const ScreenWidth = Dimensions.get("window").width;
    const [ncertBackgroundColor, setNcertBackgroundColor] = useState("#ccc");
    const [cbseBackgroundColor, setCbseBackgroundColor] = useState("white");
    const [icseBackgroundColor, setIcseBackgroundColor] = useState("white");
    
    const NcertON = () => {
      setNcertBackgroundColor("#ccc");
      setCbseBackgroundColor("white");
      setIcseBackgroundColor("white");
    };

    const CbseON = () => {
      setNcertBackgroundColor("white");
      setCbseBackgroundColor("#ccc");
      setIcseBackgroundColor("white");
    };
    const IcseON = () => {
      setNcertBackgroundColor("white");
      setCbseBackgroundColor("white");
      setIcseBackgroundColor("#ccc");
    }; 

  const openClass1 = () => {
    if (isClass1Visible) {
      setIsClass1Visible(false);
    } else {
      setIsClass1Visible(true);
    }
  };

  const openClass2 = () => {
    if (isClass2Visible) {
      setIsClass2Visible(false);
    } else {
      setIsClass2Visible(true);
    }
  };

    const openClass3 = () => {
    if (isClass3Visible) {
      setIsClass3Visible(false);
    } else {
      setIsClass3Visible(true);
    }
    };
    
    const openClass4 = () => {
    if (isClass4Visible) {
      setIsClass4Visible(false);
    } else {
      setIsClass4Visible(true);
    }
    };
    
    const openClass5 = () => {
    if (isClass5Visible) {
      setIsClass5Visible(false);
    } else {
      setIsClass5Visible(true);
    }
    };

  const openClass6 = () => {
    if (isClass6Visible) {
      setIsClass6Visible(false);
    } else {
      setIsClass6Visible(true);
    }
  };
    
    const openClass7 = () => {
    if (isClass7Visible) {
      setIsClass7Visible(false);
    } else {
      setIsClass7Visible(true);
    }
  };

    const openClass8 = () => {
    if (isClass8Visible) {
      setIsClass8Visible(false);
    } else {
      setIsClass8Visible(true);
    }
    };
    
    const openClass9 = () => {
    if (isClass9Visible) {
      setIsClass9Visible(false);
    } else {
      setIsClass9Visible(true);
    }
    };
    
    const openClass10 = () => {
    if (isClass10Visible) {
      setIsClass10Visible(false);
    } else {
      setIsClass10Visible(true);
    }
  };

  const openClass11 = () => {
    if (isClass11Visible) {
      setIsClass11Visible(false);
    } else {
      setIsClass11Visible(true);
    }
  };

    const openClass12 = () => {
    if (isClass12Visible) {
      setIsClass12Visible(false);
    } else {
      setIsClass12Visible(true);
    }
  };

    if (isClass1Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 1
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?aemr1=0-9`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class1NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?aejm1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class1NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?ahsr1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class1NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?aush1=0-18`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class1NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }
    
    if (isClass2Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 2
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }
    
    if (isClass3Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 3
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <ScrollView style={{maxHeight:ScreenHeight-150}} >
                        <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }} >
                            
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?cesa1=0-12`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class3NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?cemm1=0-14`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class3NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?chve1=0-18`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class3NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?cust1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class3NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                            </View>
                            
                            <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?ceev1=0-12`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class3NcertWorldAroundUs')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >World Around Us</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?cebu1=0-20`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class3NcertArts')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Arts</Text>
                        </TouchableOpacity>
                        
                            </View>

                            <View style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2, justifyContent:'center', alignItems:'center'}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?ceky1=0-7`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class3NcertPhysicalEducationAndWellBeing')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Physical Education and Well Being</Text>
                        </TouchableOpacity>
                        
                        </View>
                            
                        </View>
                    </ScrollView>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }
    
    if (isClass4Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 4
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <ScrollView style={{maxHeight:ScreenHeight-150}}>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?deen1=0-9`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class4NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?demh1=0-14`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class4NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?dhhn1=0-14`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class4NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?dulb1=0-22`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class4NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2, justifyContent:'center', alignItems:'center'}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?ceky1=0-7`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class4NcertEnvironmentalStudies')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Environmental Studies</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </ScrollView>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }
    
    if (isClass5Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 5
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }
    
    if (isClass6Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 6
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }

    if (isClass7Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 7
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }

    if (isClass8Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 8
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }

    if (isClass9Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 9
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }

    if (isClass10Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 10
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }

    if (isClass11Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 11
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }

    if (isClass12Visible) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 10,
            }}
          >
            Class 12
          </Text>

          <View style={{display:'flex', flexDirection:'row'}} >
          <TouchableOpacity onPress={NcertON} style={{borderWidth:0.5, backgroundColor:ncertBackgroundColor}} >
            <View style={{width:ScreenWidth / 3, display:'flex', alignItems:'center', justifyContent:'center', height:40}} ><Text style={{fontSize:12}} >NCERT</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CbseON} style={{borderWidth:0.5, backgroundColor:cbseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >CBSE</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={IcseON} style={{borderWidth:0.5, backgroundColor:icseBackgroundColor}} >
            <View style={{ width: ScreenWidth / 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }} ><Text style={{ fontSize: 12 }} >ICSE</Text></View>
              </TouchableOpacity>
                </View>

                {ncertBackgroundColor === "#ccc" && (
                    <View>
                        <View style={{display:'flex', flexDirection:'column', gap:5}} >
                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bemr1=0-13`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertEnglish')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bejm1=0-11`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertMathematics')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Mathematics</Text>
                        </TouchableOpacity>
                        
                        </View>

                        <View style={{padding: 10, display:'flex', flexDirection:'row', justifyContent:'space-around'}} >
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bhsr1=0-26`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertHindi')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{display:'flex', flexDirection:'column', gap:2}} onPress={() => {
                            Linking.openURL(`https://ncert.nic.in/textbook.php?bush1=0-19`);
                        }} >
                            <Image style={{height:200, width:150}} source={{uri:`${getImageUrlByTitle('class2NcertUrdu')}`}} ></Image>
                            <Text style={{fontSize:17, fontWeight:'300'}} >Urdu</Text>
                        </TouchableOpacity>
                        
                        </View>
                        </View>
                    </View>
                )}

                {cbseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>CBSE</Text>
                    </View>
                )}

                {icseBackgroundColor === "#ccc" && (
                    <View style={{padding:10}} >
                        <Text>ICSE</Text>
                    </View>
                )}
        </View>
        <BottomNavBar mobileNumber={fullMobileNumber} />
      </SafeAreaView>
    );
    }
  
    return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content" // Change text color (options: 'light-content', 'dark-content')
        backgroundColor="black" // Change background color (any valid color)
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{ height: 35, width: 35 }}
          source={require("../assets/images/educationImage.png")}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Education</Text>
      </View>
      <View
        style={{
          width: "100%",
          borderWidth: 0.2,
          borderColor: "grey",
          marginTop: 1,
        }}
      ></View>
      <View style={{ padding: 10 }}>
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          
                    <View
            style={{
              maxHeight: 500,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={openClass1}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 1</Text>
            </TouchableOpacity>

                      <TouchableOpacity
                          onPress={openClass2}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 2</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={openClass3}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 3</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={openClass4}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 4</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              maxHeight: 500,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
            onPress={openClass5}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 5</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openClass6}
              style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 6</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openClass7}
                style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 7</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openClass8}
                style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 8</Text>
                        </TouchableOpacity>
                        
          </View>

          <View
            style={{
              maxHeight: 500,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={openClass9}
                style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 6</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openClass10}
                style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 10</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openClass11}
                style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 11</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openClass12}
                style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: 1,
                width: 73,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                style={{ height: 35, width: 60 }}
                source={require("../assets/images/educationImage.png")}
              ></Image>
              <Text style={{ fontSize: 13 }}>Class 12</Text>
            </TouchableOpacity>
                    </View>
                    
        </View>
      </View>
      <BottomNavBar mobileNumber={fullMobileNumber} />
    </SafeAreaView>
  );
};

export default Education;

const styles = StyleSheet.create({});
