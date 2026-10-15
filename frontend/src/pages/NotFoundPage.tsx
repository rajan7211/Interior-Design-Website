import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="w-full bg-[#FBF9F5] py-24 sm:py-36 flex items-center justify-center text-center">
        <div className="max-w-xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center space-x-2 text-[#5D6853]">
            <Compass className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs uppercase font-sans tracking-[0.25em]">
              Error 404 • Coordinate Unresolved
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-[#181716] leading-tight">
            An Unmapped Void.
          </h1>

          <p className="text-sm sm:text-base font-sans text-[#55504A] max-w-md mx-auto leading-relaxed">
            The spatial coordinate, architectural monograph, or editorial archive you requested cannot be located.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/">
              <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Return to Studio Home
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="md">
                Browse Selected Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

