import fs from 'fs';
import path from 'path';

const seoAudit = () => {
  console.log('🔍 Running SEO Audit...\n');

  const checks = [
    {
      name: 'Robots.txt exists',
      check: () => fs.existsSync('public/robots.txt'),
      importance: 'High'
    },
    {
      name: 'Sitemap.xml exists',
      check: () => fs.existsSync('public/sitemap.xml'),
      importance: 'High'
    },
    {
      name: 'Meta tags implemented',
      check: () => {
        const homeFile = fs.readFileSync('src/pages/Home.jsx', 'utf8');
        return homeFile.includes('meta name="description"') && homeFile.includes('meta name="keywords"');
      },
      importance: 'High'
    },
    {
      name: 'Structured data implemented',
      check: () => {
        const homeFile = fs.readFileSync('src/pages/Home.jsx', 'utf8');
        return homeFile.includes('application/ld+json');
      },
      importance: 'Medium'
    },
    {
      name: 'Open Graph tags',
      check: () => {
        const homeFile = fs.readFileSync('src/pages/Home.jsx', 'utf8');
        return homeFile.includes('property="og:title"');
      },
      importance: 'Medium'
    },
    {
      name: 'Twitter Card tags',
      check: () => {
        const homeFile = fs.readFileSync('src/pages/Home.jsx', 'utf8');
        return homeFile.includes('name="twitter:card"');
      },
      importance: 'Medium'
    },
    {
      name: 'Canonical URLs',
      check: () => {
        const homeFile = fs.readFileSync('src/pages/Home.jsx', 'utf8');
        return homeFile.includes('rel="canonical"');
      },
      importance: 'Medium'
    }
  ];

  let passedChecks = 0;
  let highPriorityIssues = 0;

  checks.forEach(check => {
    const passed = check.check();
    const status = passed ? '✅' : '❌';
    const priority = check.importance === 'High' ? '🔴' : check.importance === 'Medium' ? '🟡' : '🟢';
    
    console.log(`${status} ${priority} ${check.name}`);
    
    if (passed) {
      passedChecks++;
    } else if (check.importance === 'High') {
      highPriorityIssues++;
    }
  });

  console.log(`\n📊 SEO Audit Results:`);
  console.log(`✅ Passed: ${passedChecks}/${checks.length}`);
  console.log(`🔴 High Priority Issues: ${highPriorityIssues}`);
  console.log(`📈 SEO Score: ${Math.round((passedChecks / checks.length) * 100)}%`);

  if (highPriorityIssues === 0) {
    console.log('\n🎉 All high priority SEO checks passed!');
  } else {
    console.log('\n⚠️  Please address high priority issues before deployment.');
  }
};

seoAudit();